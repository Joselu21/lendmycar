let stateConfig = {
    initial_state: {
        user_session: JSON.parse(localStorage.getItem("user_session")) || null,
        cache_metas: {},
        triggeredActions: {},
    },

    cache: {
        cache_path: 'cache_metas',
        cache_value_default_duration: ['5', 'minutes']
    }
};

export default stateConfig;