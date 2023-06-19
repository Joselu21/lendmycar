import actions from '../store/actions'
import store from '../store'
import Utils from '../utils'

import { useDispatch, useSelector } from 'react-redux';

/**
 * Internal hook that declares all the logic related to the cache management
 * @returns {Object} An object that contains public methods to handle the cache
 */
function _useGlobalStateHandler()
{
    const dispatch = useDispatch();

    /**
     * Returns the whole global state (not recommended, better to use the useSelector one)
     * @returns {Object} The whole global state
     */
    function get()
    {
        return store.getState();
    }

    /**
     * Determines if the global state contains a specific attribute
     * @param {string} attribute - The attribute to check for
     * @returns {boolean} Whether the attribute exists in the global state or not
     */
    function contains(attribute)
    {
        return Utils.objectContains(attribute, store.getState());
    }

    /**
     * Returns the value of a specific attribute in the global state
     * @param {string} attribute - The attribute to get the value of
     * @returns {any} The value of the attribute in the global state
     */
    function getValue(attribute)
    {
        return Utils.getAttributeValue(attribute, store.getState());
    }

    /**
     * Dispatches the set action with a specific attribute in the global state
     * @param {string} attribute - The attribute to set
     * @param {any} value - The value to set the attribute to
     * @param {Object} opts - An optional object that can contain properties. Not really useful for now but it might be in future updates
     */
    function set(attribute, value, opts)
    {
        dispatch(actions.set(attribute, value, opts));
    }

    /**
     * Dispatches the remove action with a specific attribute from the global state
     * @param {string} attribute - The attribute to remove
     */
    function remove(attribute)
    {
        dispatch(actions.remove(attribute));
    }

    return {
        get,
        contains,
        getValue,
        set,
        remove
    };
}

export default function useStateHandler()
{
    const state = useSelector(state => state); /* By importing useSelector, this will tell React that your component needs to be marked as dirty whenever the state changes so that it can re-render. */
    const stateHandler = _useGlobalStateHandler();
    return { stateHandler, state };
};