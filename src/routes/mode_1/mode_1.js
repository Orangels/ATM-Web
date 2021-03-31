import React from 'react';
import io from 'socket.io-client'
import video from 'video.js';
import videoSWF from 'videojs-swf/dist/video-js.swf';
import {Drawer, Col, Row, Tag, Button, Popover, Select, Message} from 'antd'
import {_fetch, get_2_float, _download_file} from '../../utils/utils'
import {get_server_info, HOST, stop_infer_server, start_infer_server,update_video_path, change_video_mode, download_log} from '../../utils/urls'
import {screen_scale_height, screen_scale_width} from '../../utils/params'

import "video.js/dist/video-js.css";
import back from '../../assets/back/back_large.jpg'
import bg from '../../assets/back/bg.jpg'
import './model_1.css'
import login_bg from "../../assets/bg/login_bg.jpg";

const uri = 'http://localhost/test';
const options = { transports: ['websocket'] };

const content_1_height = 600 - 230
// const warning_img_height = 230
const warning_img_height = 150
const img_col = 5
const img_width = 250

const { Option } = Select;

let local_url = HOST()

const device_info = [
    {
      title:'CPU',
      content:'128核 1.4GHz'
    },
    {
        title:'内存',
        content:'4G'
    },
    {
        title:'功耗',
        content:'10W'
    },
    {
        title:'算力',
        content:'473GFLOPS'
    },
]

class App extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            mode:'rgb', // gray rgb ( 黑白 彩色模式 )
            runing:false,
            video_paths:[],
            selectVideo:0,
            src:[],
            //聚集
            gather:[],
            //
            hand_det:[],
            //频繁回头
            turn_round:[],
            //遮挡
            shelter:[],
            //频繁出入
            come_out:[],
            // drawer
            visible: false,
            cpu_percent:0,
            cpu_temp:0,
            gpu_percent:0,
            memory_total:'0M',
            memory_used:'0M',
            disk_total:'0G',
            disk_used:'0G',
            memory_percent:0,
            disk_percent:0
        };

        this._ws_new_state = this._ws_new_state.bind(this)
        this.get_device_info = this.get_device_info.bind(this)
        this.waring_img_history = this.waring_img_history.bind(this)

        this.video_run = this.video_run.bind(this)
        this.change_mode = this.change_mode.bind(this)
        this.selectChange = this.selectChange.bind(this)
        this.update_video_path = this.update_video_path.bind(this)
        this.server_run = this.server_run.bind(this)
        this.download_log = this.download_log.bind(this)


        this.socket = 1


    }

    download_log(){
        _download_file(local_url+download_log,{

        },(blob)=> {
            let url = window.URL.createObjectURL(blob);
            let filename = 'report.pdf'
            let a = document.createElement('a')
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        })
    }

    update_video_path(){
        if (this.state.video_paths.length == 0){
            Message.error('未发现视频')
        }else {
            _fetch(local_url+update_video_path, {path:this.state.video_paths[this.state.selectVideo]}, (json)=>{
                if (json.code == 200){
                    Message.success('修改成功')
                }else {
                    Message.error('修改失败')
                }
            })
        }
    }

    selectChange(e){
        console.log(e)
        console.log(this.state.video_paths[e])
        this.setState({
            selectVideo:e
        })
    }

    server_run(){
        if (this.state.runing){
            _fetch(local_url+stop_infer_server, {}, (json)=>{
                if (json.code == 200){
                    this.setState({
                        runing: !this.state.runing
                    }, ()=>{

                    })
                }
            })
        }else {
            _fetch(local_url+start_infer_server, {}, (json)=>{
                if (json.code == 200){
                    this.setState({
                        runing: !this.state.runing
                    }, ()=>{

                    })
                }



            })
        }
    }

    video_run(){
        let _this = this;
        async function fn() {
          await _this.update_video_path();
          await _this.server_run();
        }
        fn();
    }

    change_mode(){
        let mode = this.state.mode == 'gray' ? 'rgb' : 'gray'
        _fetch(local_url+change_video_mode, {mode:mode == 'gray' ? 1 : 0}, (json)=>{
            if (json.code == 200){
                this.setState({
                    mode: mode
                }, ()=>{
                    Message.success('修改成功')
                })
            }else{
                Message.error('修改失败')
            }
        })
        // this.setState({
        //     mode: this.state.mode == 'gray' ? 'rgb' : 'gray'
        // })
    }

    _ws_new_state(data){
        let url = window.location.origin
        // let url = 'http://127.0.0.1:5000'
        // let url = 'http://192.168.88.42:5000'
        let results = data.result
        for (let result of results){
            console.log('*******')
            console.log(`${url}${result.path}`)
            // console.log(result.mode)
            switch (result.mode) {
                case 0:
                    this.setState({
                        gather:this.state.gather.concat(`${url}${result.path}`)
                    })
                    break
                case 1:
                    this.setState({
                        hand_det:this.state.hand_det.concat(`${url}${result.path}`)
                    })
                    break
                case 2:
                    this.setState({
                        turn_round:this.state.turn_round.concat(`${url}${result.path}`)
                    })
                    break
                case 3:
                    this.setState({
                        shelter:this.state.shelter.concat(`${url}${result.path}`)
                    })
                    break
                case 4:
                    this.setState({
                        come_out:this.state.come_out.concat(`${url}${result.path}`)
                    })
                    break
                default:
                    break
            }
        }

        // this.setState({
        //     src:`data:image/png;base64,${data.data.img}`
        //     // src:`http://192.168.88.91:9000${data.data.img}`
        // },()=>{
        // })

    }

    get_device_info(){
        let url = window.location.origin + '/'
        // let url = 'http://127.0.0.1:5000/'
        url = `${url}device_info`

        _fetch(url,{}, (json)=>{
            // console.log(json.result)
            let result = json.result
            let memory_percent = get_2_float(result.memory_used.substring(0, result.memory_used.indexOf('M')) /
                result.memory_total.substring(0, result.memory_total.indexOf('M')))
            let disk_percent = get_2_float(result.disk_used.substring(0, result.disk_used.indexOf('G')) /
                result.disk_total.substring(0, result.disk_total.indexOf('G')))

            this.setState({
                cpu_percent:result.cpu_percent,
                cpu_temp:result.cpu_temp,
                gpu_percent:result.gpu_percent,
                memory_total:result.memory_total,
                memory_used:result.memory_used,
                disk_total:result.disk_total,
                disk_used:result.disk_used,
                memory_percent:memory_percent,
                disk_percent:disk_percent
            })
        })

    }

    componentDidMount() {

        _fetch(local_url + get_server_info, {}, (json)=>{
            console.log(json.result)

            if (json.code == 200){
                this.setState({
                    runing:json.result.run,
                    video_paths:json.result.videos,
                })
            }
        })


        //拉流
        let options_1 = {
            // autoplay:    true,
            controls:    true,
            preload:     true, //预加载
            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
            aspectRatio: '16:9',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
            techOrder:   ['html5'],//Video.js技术首选的顺序
            live: true,
            sources: [{
                type: "application/x-mpegURL",
                // src: "http://192.168.88.27/hls/room_1.m3u8",
                // src: "http://192.168.88.92:8080/hls/test.m3u8",
                // src: "http://192.168.88.25/hls/room.m3u8",
                src: `http://${window.location.hostname}/hls/000.m3u8`,
                // src: `http://172.16.104.252/hls/000.m3u8`,
                withCredentials: false
            }],
            // html5: { hls: { withCredentials: true } },
            html5: { hls: { withCredentials: false } },
        }

        let options_2 = {
            autoplay:    true,
            controls:    true,
            preload:     true, //预加载
            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
            aspectRatio: '16:9',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
            techOrder:   ['html5'],//Video.js技术首选的顺序
            live: true,
            sources: [{
                type: "application/x-mpegURL",
                // src: "http://192.168.88.27/hls/room_1.m3u8",
                // src: "http://192.168.88.92:8080/hls/test.m3u8",
                // src: "http://192.168.88.25/hls/room_2.m3u8",
                src: `http://${window.location.hostname}/hls/room_2.m3u8`,
                withCredentials: false
            }],
            // html5: { hls: { withCredentials: true } },
            html5: { hls: { withCredentials: false } },
        }


        this.player_1 = video('example_video_1',options_1);


        // this.player_2 = video('example_video_2',options_2);


        let url = window.location.origin + '/'
        // let url = 'http://127.0.0.1:5000/'
        // let url = 'http://192.168.88.42:5000/'
        url = `${url}Camera_Web_ws`

        //本机测试 用固定 url
        console.log('长连接 服务器')
        // this.socket = io(url)
        // this.socket.on('new_state',this._ws_new_state);
        this.start_time = new Date().getTime()
        // this.socket.on('new_person_state',this._ws_new_person_state);

        // this.timer = setInterval(this.get_device_info,2000)

    }

    componentWillUnmount() {
        this.player_1.dispose()
        // this.player_2.dispose()
        // this.socket.emit('disconnect')
        // this.timer && clearInterval(this.timer)
    }

    showDrawer = ()=>{
        this.setState({
            visible: true,
        });
    }
    onClose = ()=>{
        this.setState({
            visible: false,
        });
    }

    waring_img_history = (imgs_arr)=>{
        //倒叙
        let [...imgs] = imgs_arr
        imgs.reverse()
        let Imgs_history = imgs.map((img, i)=>{
            let left = i === 0 ? 0 : 15
            return (
                <img width={150} height={90} src={img} style={{marginLeft:left}}/>
            )
        })
        return Imgs_history
    }

    render() {

        let imgW = 1106 * 4 /3 * screen_scale_width
        let imgH = imgW * 9 / 16

        let Device_component = device_info.map((val, index)=>{
            return (
                <div style={styles.device_div}>
                    <span style={styles.device_span}>
                        {val.title}
                    </span>
                    <Tag  style={styles.device_tag} color={'#08D1FA'}>
                        {val.content}
                    </Tag>
                </div>
            )
        })

        let video_paths = this.state.video_paths.map((val, index)=>{
            return (
                <Option value={index}>{val}</Option>
            )
        })

        return(
            <div className="Mode_1" style={styles.wrap_div}>
                <Row gutter={16}
                     type="flex" justify="space-between"
                     style={{
                         padding:20,
                         width:"85%", alignSelf:'center'}}
                    // style={{display:"flex", flexDirection:"column"}}
                >
                    {Device_component}
                </Row>
                <Row gutter={16}
                     // style={{backgroundColor:'#F0F2F5', padding:10}}
                     style={{width:"85%", alignSelf:'center'}}
                >
                    <Col span={24} style={{position: 'relative'}}>
                        {/*<Tag color={'#FA0F21'} style={{position: 'absolute', top:10, right:10, zIndex:99}}>*/}
                        {/*    {'正视摄像头'}*/}
                        {/*</Tag>*/}
                        <video id="example_video_1" className="video-js vjs-custom-skin vjs-fluid" data-setup=''
                               poster={back}
                               style={{
                                   width:'100%',
                                   // height:content_1_height,
                                   // objectFit:"fill",
                                   objectFit:'contain',
                                   zIndex: this.state.runing ? 99 : 1
                               }}
                               ref={(input) => { this.video = input; }}

                        >
                            <source src="rtmp://127.0.0.1:1935/rtmplive/room" type="rtmp/flv"/>
                        </video>
                        {/*<img src={back} width={imgW} height={imgH} style={{zIndex: this.state.runing ? 1 : 99,*/}
                        {/*    position: "absolute", top: 0, left: 0}} />*/}
                    </Col>
                </Row>
                <div style={{position:"absolute", top:100*screen_scale_height, left:5 * screen_scale_width,
                display:'flex', flexDirection:"column"}}>
                    <Select style={{ width:130*screen_scale_width }} onChange={this.selectChange} placeholder={"选择视频"}>
                        {video_paths}
                    </Select>
                    <Button type="primary" onClick={this.video_run} style={{marginTop: 20 * screen_scale_height}}>
                        {this.state.runing ? '停止' : '启动'}
                    </Button>
                    <Button style={{marginTop:20 * screen_scale_height}} type="primary"
                    onClick={this.change_mode}>
                        {this.state.mode == "gray" ? '彩色模式' : '黑白模式'}
                    </Button>
                    <Button type="primary" onClick={this.download_log} style={{marginTop: 20 * screen_scale_height}}>
                        下载日志
                    </Button>
                    <Button type="primary"style={{marginTop: 20 * screen_scale_height}}>
                        <a href={local_url+'/static/videos/plane_0129.mp4'} target={'_blank'}>播放录像</a>
                    </Button>
                </div>
            </div>
        )
    }

}

const styles = {
    wrap_div:{
        background:`url(${bg}) no-repeat `,
        backgroundSize: '100% 100%',
        transition:'all .5s',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        position: 'relative'
    },
    waring_img :{
        width:img_width,
        height:warning_img_height,
        position:'relative',
        marginTop:20
    },
    waring_tag:{
        position: 'absolute',
        top:10,
        left:20
    },
    device_div:{
        display:"flex",
        flexDirection:"row",
        width: 180,
    },
    device_span:{
        color:'#FFFFFF'
    },
    device_tag:{
        marginLeft:10,
        width: 100
    }
}

export default App;
