var i = "production", o = {
    dev: "https://apiopen3t.jingdaka.com/",
    production: "https://apiopen.jingdaka.com/"
}, t = {
    dev: "https://jdk3t-qiye.oss-cn-shanghai.aliyuncs.com/",
    production: "https://cdn-qiye.jingdaka.com/"
}, e = {
    dev: "https://jdk3t-qiye.oss-cn-shanghai.aliyuncs.com/backend_pic/dst/poster/",
    production: "https://cdn-qiye.jingdaka.com/backend_pic/dst/poster/"
}, c = {
    dev: "https://jdk3t-voice.oss-cn-shanghai.aliyuncs.com/backend_voice/",
    production: "https://cdn-qiye-voice.jingdaka.com/backend_voice/"
}, d = {
    dev: "https://jdk3t-video.oss-cn-shanghai.aliyuncs.com/video/",
    production: "https://cdn-qiye-dakavideos.jingdaka.com/video/"
}, a = {
    dev: "http://static3topen.jingdaka.com/images/",
    production: "https://cdn-qiye.jingdaka.com/images/"
};

module.exports = {
    env: i,
    version: "4.4.2",
    HOST: o[i],
    videoPosterBase: t[i],
    hybridPicturePrefix: e[i],
    hybridVoicePrefix: c[i],
    voicePrefix: c[i],
    videoPrefix: d[i],
    staticPictureBase: a[i]
};