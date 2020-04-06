import React from 'react';
import io from 'socket.io-client'
import video from 'video.js';
import videoSWF from 'videojs-swf/dist/video-js.swf';
import {Drawer, Col, Row, Tag, Button, Popover} from 'antd'
import {_fetch, get_2_float} from '../../utils/utils'
import "video.js/dist/video-js.css";
import back from '../../assets/back/back_large.jpg'
import bg from '../../assets/back/bg.jpg'
import './model_1.css'
import login_bg from "../../assets/bg/login_bg.jpg";

const uri = 'http://localhost/test';
const options = { transports: ['websocket'] };

const content_1_height = 600 - 230
// const warning_img_height = 230
const warning_img_height = 180
const img_col = 5
const img_width = 230

class App extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
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
        this.socket = 1


    }

    _ws_new_state(data){
        let url = window.location.origin
        // let url = 'http://127.0.0.1:5000'
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
        //拉流
        let options_1 = {
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
                // src: "http://192.168.88.25/hls/room.m3u8",
                src: `http://${window.location.hostname}/hls/room.m3u8`,
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


        this.player_2 = video('example_video_2',options_2);


        let url = window.location.origin + '/'
        // let url = 'http://127.0.0.1:5000/'
        url = `${url}Camera_Web_ws`

        //本机测试 用固定 url
        console.log('长连接 服务器')
        this.socket = io(url)
        this.socket.on('new_state',this._ws_new_state);
        this.start_time = new Date().getTime()
        // this.socket.on('new_person_state',this._ws_new_person_state);

        this.timer = setInterval(this.get_device_info,2000)

    }

    componentWillUnmount() {
        this.player_1.dispose()
        this.player_2.dispose()
        this.socket.emit('disconnect')
        this.timer && clearInterval(this.timer)
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

    waring_img_history = (imgs)=>{
        //倒叙
        imgs.reverse()
        let Imgs_history = imgs.map((img, i)=>{
            let left = i === 0 ? 0 : 15
            return (
                <img width={100} height={100} src={img} style={{marginLeft:left}}/>
            )
        })
        return Imgs_history
    }

    render() {

        return(
            <div className="Mode_1" style={styles.wrap_div}>
                {/*<Button type="primary" onClick={this.showDrawer} style={{marginLeft:10}}>*/}
                {/*    设备信息*/}
                {/*</Button>*/}
                {/*<Drawer*/}
                {/*    title="设备硬件信息"*/}
                {/*    placement="top"*/}
                {/*    closable={false}*/}
                {/*    onClose={this.onClose}*/}
                {/*    visible={this.state.visible}*/}
                {/*    height={200}*/}
                {/*>*/}
                <Row gutter={16}
                     type="flex" justify="space-between"
                     style={{ padding:20}}
                     // style={{display:"flex", flexDirection:"column"}}
                >
                        <div style={styles.device_div}>
                            <span style={styles.device_span}>
                                CPU利用率:
                            </span>
                            <Tag color={this.state.cpu_percent > 70 ? '#FA0F21' : '#08D1FA'} style={styles.device_tag}>
                                {`${this.state.cpu_percent}%`}
                            </Tag>
                        </div>
                        <div style={styles.device_div}>
                            <span style={styles.device_span}>
                                CPU温度:
                            </span>
                            <Tag color={this.state.cpu_temp > 70 ? '#FA0F21' : '#08D1FA'} style={styles.device_tag}>
                                {`${this.state.cpu_temp}℃`}
                            </Tag>
                        </div>
                        <div style={styles.device_div}>
                            <span style={styles.device_span}>
                                GPU利用率:
                            </span>
                            <Tag color={this.state.gpu_percent > 70 ? '#FA0F21' : '#08D1FA'} style={styles.device_tag}>
                                {`${this.state.gpu_percent}%`}
                            </Tag>
                        </div>
                        <div style={styles.device_div}>
                            <span style={styles.device_span}>
                                总内存:
                            </span>
                            <Tag color={'#08D1FA'} style={styles.device_tag}>
                                {`${this.state.memory_total}`}
                            </Tag>
                        </div>
                        <div style={styles.device_div}>
                            <span style={styles.device_span}>
                                已使用内存:
                            </span>
                            <Tag color={this.state.memory_percent > 70 ? '#FA0F21' : '#08D1FA'} style={styles.device_tag}>
                                {`${this.state.memory_used}`}
                            </Tag>
                        </div>
                        <div style={styles.device_div}>
                            <span style={styles.device_span}>
                                总硬盘大小:
                            </span>
                            <Tag color={'#08D1FA'} style={styles.device_tag}>
                                {`${this.state.disk_total}`}
                            </Tag>
                        </div>
                        <div style={styles.device_div}>
                            <span style={styles.device_span}>
                                已使用硬盘大小:
                            </span>
                            <Tag color={this.state.disk_percent > 70 ? '#FA0F21' : '#08D1FA'} style={styles.device_tag}>
                                {`${this.state.disk_used}`}
                            </Tag>
                        </div>
                </Row>
                {/*</Drawer>*/}
                <Row gutter={16}
                     // style={{backgroundColor:'#F0F2F5', padding:10}}
                     style={{ padding:10}}
                >
                    <Col span={12} >
                        <Tag color={'#FA0F21'} style={{position: 'absolute', top:10, right:10, zIndex:99}}>
                            {'正视摄像头'}
                        </Tag>
                        <video id="example_video_1" className="video-js vjs-custom-skin vjs-fluid"  preload="auto"  data-setup=''
                               style={{width:'100%', height:content_1_height}}
                               ref={(input) => { this.video = input; }}

                        >
                            <source src="rtmp://127.0.0.1:1935/rtmplive/room" type="rtmp/flv"/>
                        </video>
                    </Col>
                    <Col span={12} >
                        <Tag color={'#FA0F21'} style={{position: 'absolute', top:10, right:10, zIndex:99}}>
                            {'俯视摄像头'}
                        </Tag>
                        <video id="example_video_2" className="video-js vjs-custom-skin vjs-fluid"  preload="auto"  data-setup=''
                               style={{width:'100%', height:content_1_height}}
                               ref={(input) => { this.video = input; }}

                        >
                            <source src="rtmp://127.0.0.1:1935/rtmplive/room" type="rtmp/flv"/>
                        </video>
                    </Col>
                </Row>
                <Row gutter={12} type="flex" justify="space-between"
                     // style={{backgroundColor:'#F0F2F5', padding:10}}
                     style={{ padding:10}}
                >
                    <div span={img_col} style={{width:img_width, height:warning_img_height, position:'relative'}}>
                        <Tag color={'#FA0F21'} style={{position: 'absolute', top:10, left:20}}>
                            {'聚集检测'}
                        </Tag>
                        <Popover content={this.waring_img_history(this.state.gather)} title={"聚集历史告警"} trigger="hover">
                            <img width="100%" height={`${warning_img_height}`} src={this.state.gather.length > 0 ? this.state.gather[this.state.gather.length-1] : back}/>
                        </Popover>
                    </div>
                    <div span={img_col - 1} style={styles.waring_img}>
                        <Tag color={'#FA0F21'} style={styles.waring_tag}>
                            {'手部检测'}
                        </Tag>
                        <Popover content={this.waring_img_history(this.state.hand_det)} title={"手部历史告警"} trigger="hover">
                            <img width="100%" height={`${warning_img_height}`} src={this.state.hand_det.length > 0 ? this.state.hand_det[this.state.hand_det.length-1]:back}/>
                        </Popover>
                    </div>
                    <div span={img_col} style={styles.waring_img}>
                        <Tag color={'#FA0F21'} style={styles.waring_tag}>
                            {'频繁回头'}
                        </Tag>
                        <Popover content={this.waring_img_history(this.state.turn_round)} title={"频繁回头历史告警"} trigger="hover">
                            <img width="100%" height={`${warning_img_height}`} src={this.state.turn_round.length > 0 ? this.state.turn_round[this.state.turn_round.length-1]:back}/>
                        </Popover>
                    </div>
                    <div span={img_col} style={styles.waring_img}>
                        <Tag color={'#FA0F21'} style={styles.waring_tag}>
                            {'遮挡检测'}
                        </Tag>
                        <Popover content={this.waring_img_history(this.state.shelter)} title={"遮挡历史告警"} trigger="hover">
                            <img width="100%" height={`${warning_img_height}`} src={this.state.shelter.length > 0 ? this.state.shelter[this.state.shelter.length-1]:back}/>
                        </Popover>
                    </div>
                    <div span={img_col} style={styles.waring_img}>
                        <Tag color={'#FA0F21'} style={styles.waring_tag}>
                            {'频繁出入'}
                        </Tag>
                        <Popover content={this.waring_img_history(this.state.come_out)} title={"频繁出入历史告警"} trigger="hover">
                            <img width="100%" height={`${warning_img_height}`} src={this.state.come_out.length > 0 ? this.state.come_out[this.state.come_out.length-1]:back}/>
                        </Popover>
                    </div>
                </Row>
            </div>
        )
    }

}

const styles = {
    wrap_div:{
        background:`url(${bg}) no-repeat `,
        backgroundSize: '100% 100%',
        transition:'all .5s'
    },
    waring_img :{
        width:img_width,
        height:warning_img_height,
        position:'relative'
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
    }
}

export default App;
