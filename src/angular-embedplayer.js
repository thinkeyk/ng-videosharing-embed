angular.module('videosharing-embed', []);

angular.module('videosharing-embed').service('PlayerConfig', function () {
	'use strict';
    this.createInstance = function (init) {
        var PlayerConfig = function (init) {
            this.type = init.type;
            this.playerRegExp = init.playerRegExp;
            this.timeRegExp = init.timeRegExp;
            this.whitelist = init.whitelist;
            this.config = {
                playerID: init.playerID,
                settings: init.settings,
                transformAttrMap: init.transformAttrMap
            };
            this.processSettings = init.processSettings;
            this.isPlayerFromURL = function (url) {
                return (url.match(this.playerRegExp) != null);
            }
        };
        return new PlayerConfig(init);
    }
});
//
angular.module('videosharing-embed').factory('RegisteredPlayers', [ 'PlayerConfig', function (PlayerConfig) {
	'use strict';
    var configurations = {
        youtube: {
            type: "youtube",
            settings: {
                autoplay: 0,
                controls: 1,
                loop: 0
            },
            whitelist: ['autohide', 'cc_load_policy', 'color', 'disablekb', 'enablejsapi',
                'autoplay', 'controls', 'loop', 'playlist', 'rel', 'wmode', 'start', 'showinfo',
                'end', 'fs', 'hl', 'iv_load_policy', 'list', 'listType', 'modestbranding', 'origin',
                'playerapiid', 'playsinline', 'theme'],
            transformAttrMap: {},
            processSettings : function(settings, videoID) {
                if(settings['loop'] == 1 && (settings['playlist'] == undefined)) {
                    settings['playlist'] = videoID;
                }
                return settings;
            },
            playerID: 'www.youtube.com/embed/',
            playerRegExp: /([a-z\:\/]*\/\/)(?:www\.)?(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
            timeRegExp: /t=(([0-9]+)h)?(([0-9]{1,2})m)?(([0-9]+)s?)?/
        },
        vimeo: {
            type: "vimeo",
            settings: {
                autoplay: 0,
                loop: 0,
                api: 0,
                player_id: ''
            },
            whitelist: ['autoplay', 'autopause', 'badge', 'byline', 'color', 'portrait', 'loop', 'api',
                'playerId', 'title'],
            transformAttrMap: { 'playerId' : 'player_id'},
            processSettings : function(settings, videoID) {
                return settings;
            },
            playerID: 'player.vimeo.com/video/',
            playerRegExp: /([a-z\:\/]*\/\/)(?:www\.)?vimeo\.com\/(?:channels\/[A-Za-z0-9]+\/)?([A-Za-z0-9]+)/,
            timeRegExp: ''
        },
        dailymotion: {
            type: "dailymotion",
            settings: {
                autoPlay: 0,
                logo: 0
            },
            whitelist: ['api', 'autoPlay', 'background', 'chromeless', 'controls', 'foreground', 'highlight', 'html',
                'id', 'info', 'logo', 'network', 'quality', 'related', 'startscreen', 'webkit-playsinline', 'syndication'],
            transformAttrMap: {},
            processSettings : function(settings, videoID) {
                return settings;
            },
            playerID: 'www.dailymotion.com/embed/video/',
            playerRegExp: /([a-z\:\/]*\/\/)(?:www\.)?www\.dailymotion\.com\/video\/([A-Za-z0-9]+)/,
            timeRegExp: /start=([0-9]+)/
        },
        youku: {
            type: "youku",
            settings: {},
            whitelist: [],
            transformAttrMap: {},
            processSettings : function(settings, videoID) {
                return settings;
            },
            playerID: 'player.youku.com/embed/',
            playerRegExp: /([a-z\:\/]*\/\/)(?:www\.)?youku\.com\/v_show\/id_([A-Za-z0-9]+).html/,
            timeRegExp: ''
        },
        facebook: {
            type: "facebook",
            settings: {},
            whitelist: [],
            transformAttrMap: {},
            processSettings: function(settings, videoID) {
              return settings;
            },
            playerID: 'www.facebook.com/video/embed?video_id=',
            playerRegExp: /([a-z\:\/]*\/\/)(?:www\.)?facebook\.com\/v_show\/id_([A-Za-z0-9]+).html/,
            timeRegExp: ''
        }
    };
    var players = [];
    angular.forEach(configurations, function (value) {
        players.push(PlayerConfig.createInstance(value));
    });
    return players;
}]);
