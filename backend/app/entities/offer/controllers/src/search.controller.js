const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

function _getPipeline(lat, lon, indexName, maxDistance, query, fieldName) 
{
    let pipeline = [];
    pipeline.push({
        $geoNear: {
            near: {
                type: "Point",
                coordinates: [lon, lat]
            },
            distanceField: "distance",
            key: indexName,
            maxDistance: maxDistance === 0 ? 1000 * 1000000 : maxDistance,
            spherical: true,
            query: query
        }
    },
    {
        $sort: {
            "distance": 1
        }
    },
    {
        $addFields: {
            [fieldName]: {
                $divide: ["$distance", 1000]
            }
        }
    });
    return pipeline;
}

/**
 * Search rent offers
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function searchRent(req, res) 
{
    const Offer = ModelsService.Models.Offer;
    const Rent = Offer.Rent;
    try 
    {
        const options = {
            page: req.query.page ?? 1,
            limit: req.query.limit ?? 10,
        };

        let lat = req.location.latitude;
        let lon = req.location.longitude;
        let maxDistance = 1000 * 10000; // 100 km
        if (req.query.lat && req.query.lon)
        {
            lat = parseFloat(req.query.lat);
            lon = parseFloat(req.query.lon);
            maxDistance = req.query.maxDistance ? parseFloat(req.query.maxDistance) : maxDistance;
        }
        let pipeline = _getPipeline(lat, lon, "location", maxDistance, {
            "offer_status": "available",
        }, "distance_km");

        const aggregatePipeline = Rent.subModel.aggregate(pipeline);
        const response = await Rent.subModel.aggregatePaginate(aggregatePipeline, options);
        response.docs = await Promise.all(response.docs.map(async (doc) => 
        {
            let tmp = new Rent.subModel(doc);
            await tmp.populate("car");
            await tmp.populate("user");
            tmp = tmp.toJSON();
            tmp.distance = doc.distance;
            tmp.distance_km = doc.distance_km;
            return tmp;
        }));
        return res.status(200).json(response);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Search share offers
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function searchShare(req, res) 
{
    const Offer = ModelsService.Models.Offer;
    const Share = Offer.Share;
    try 
    {
        const options = {
            page: req.query.page ?? 1,
            limit: req.query.limit ?? 10,
        };

        let latStart = req.location.latitude;
        let lonStart = req.location.longitude;
        let maxDistance = 1000 * 10000; // 100 km
        if (req.query.latStart && req.query.lonStart)
        {
            latStart = parseFloat(req.query.latStart);
            lonStart = parseFloat(req.query.lonStart);
            maxDistance = req.query.maxDistance ? parseFloat(req.query.maxDistance) : maxDistance;
        }

        let latEnd = req.location.latitude;
        let lonEnd = req.location.longitude;
        if (req.query.latEnd && req.query.lonEnd)
        {
            latEnd = parseFloat(req.query.latEnd);
            lonEnd = parseFloat(req.query.lonEnd);
        }

        let pipeline = _getPipeline(latStart, lonStart, "offer_start_location", maxDistance, {
            "offer_status": "available",
        }, "distance_start_km");

        let aggregatePipeline = Share.subModel.aggregate(pipeline);
        let response = await Share.subModel.aggregatePaginate(aggregatePipeline, options);

        pipeline = _getPipeline(latEnd, lonEnd, "offer_end_location", maxDistance, {
            "offer_status": "available",
            _id: {
                $in: response.docs.map(doc => doc._id)
            }
        }, "distance_end_km");

        aggregatePipeline = Share.subModel.aggregate(pipeline);
        let response2 = await Share.subModel.aggregatePaginate(aggregatePipeline, options);

        response2.docs = await Promise.all(response2.docs.map(async (doc) => 
        {
            let tmp = new Share.subModel(doc);
            await tmp.populate("car");
            await tmp.populate("user");
            tmp = tmp.toJSON();
            tmp.distance_end_km = doc.distance_km;
            return tmp;
        }));
        return res.status(200).json(response2);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    searchRent,
    searchShare
};