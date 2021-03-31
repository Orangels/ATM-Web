export let screen_width = document.documentElement.clientWidth;
// 798
export let screen_height = document.documentElement.clientHeight;

export let model_width = screen_width > 1920 ? 1920 : screen_width;
export let model_height = screen_height > 1080 ? 1080 : screen_height;

export let screen_scale_width = model_width/1920 ;
export let screen_scale_height = model_height/1080;

export let LoginTag = 'stepLogin'

class System_param{
    // 构造
    constructor(props) {

        // 初始状态
        this.screen_width = document.documentElement.clientWidth;
        this.screen_height = document.documentElement.clientHeight;

        this.model_width = this.screen_width > 1920 ? 1920 : this.screen_width;
        this.model_height = this.screen_height > 1080 ? 1080 : this.screen_height;

        this.screen_scale_width = this.model_width/1920;
        this.screen_scale_height = this.model_height/1080;

    }

}

export let url = window.location.origin
export let hostname = window.location.hostname
// export let url = 'http://127.0.0.1:5000'
// const url = 'http://192.168.88.221:5000'
// export let url = 'http://192.168.88.221:5000'
export let GET_RTMP_URL = `${url}/get_rtmp_url`
export let ADD_RTMP_URL = `${url}/add_rtmp_url`
export let DEL_RTMP_URL = `${url}/del_rtmp_url`
export let GET_ALL_PERSONS = `${url}/all_persons`
export let UPLOAD_IMG_TMP = `${url}/upload_tmp`
export let ADD_PERSON = `${url}/add_person`

export let system_param = new System_param();


function rgb(b, g, r) {
    /**
     * cv bgr to  rgb to 16
     */
    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;

}

// export let trackerColoreMap = [rgb(0, 255, 128), rgb(0, 64, 200), rgb(0, 255, 0), rgb(255, 64, 0), rgb(128, 0, 192),
//     rgb(0, 0, 64), rgb(0, 128, 64),rgb(0, 0, 192), rgb(0, 128, 128), rgb(128, 0, 0), rgb(128, 0, 128),
//     rgb(0, 128, 192), rgb(128, 0, 64), rgb(128, 0, 192), rgb(128, 128, 64), rgb(128, 128, 192),
//     rgb(0, 64, 0), rgb(128, 64, 0), rgb(0, 192, 0), rgb(0, 192, 128)]


export let trackerColoreMap = [
    rgb(128, 0, 192),rgb(128, 0, 128),rgb(64, 0, 0),rgb(192, 0, 0),
    rgb(192, 128, 0),rgb(64, 0, 128), rgb(192, 0, 128),  rgb(192, 128, 128),
    rgb(64, 0, 128), rgb(128, 0, 64), rgb(128, 0, 192), rgb(128, 128, 64), rgb(128, 128, 192)];

export let personIDColreMap = {
    420:rgb(0, 64, 200),
    421:rgb(0, 0, 128),
    423:rgb(255, 64, 0)
}