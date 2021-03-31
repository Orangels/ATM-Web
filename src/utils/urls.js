
// export let HOST = 'http://www.petcv.net:9000'
// export let HOST_TEST = 'http://192.168.88.61:9000'
export let HOST = function () {
    let url = window.location.origin
    // let url = 'http://192.168.88.42:3000'
    // if (url.indexOf("192.168.88") !== -1 ){
    //     url = 'http://192.168.88.42:3000'
    // }
    // else if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1){
    //     url = 'http://192.168.88.42:3000'
    //     // url = 'http://127.0.0.1:5000'
    //     // url = 'http://127.0.0.1:9000'
    //     // url = 'http://10.11.149.225:8000'
    // }else {
    //     // //测试
    //     // url = 'http://127.0.0.1:9000'
    //     // url = 'http://172.16.104.80:9000'
    //     // url = 'http://192.168.88.191:9000'
    //     // url = 'http://211.103.201.178:9000'
    // }

    return url
}

export let get_server_info = '/get_server_info'
export let stop_infer_server = '/stop_infer_server'
export let start_infer_server = '/start_infer_server'
export let update_video_path = '/update_video_path'
export let change_video_mode = '/change_video_mode'
export let download_log = '/download_log'