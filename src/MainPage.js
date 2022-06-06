import React from 'react';
import { Paginator, Verifier } from 'yeskendyr';
import {
    PageHeader,
    Dropdown,
    Select,
    Input,
    Tooltip,
    Button,
    notification,
    Divider,
    Space, Image,
} from 'antd';
import { InfoCircleOutlined, UserOutlined, EditOutlined, DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './MainPage.css';

function Main({store, action, list, set}) {

    const [state, setState] = React.useState({
        lang: 'en',
        error: '',
        current: 0,
        success: false,

        user: '',
        text: ''
    });
    const { TextArea } = Input;
    const { Option } = Select;

    const messager = (en, ru, kz) => state.lang && state.lang==='en' ? en : state.lang==='ru' ? ru : kz;
    const messages = {
        header: messager('Verification system', 'Система верификации', 'Тексеру жүйесі'),
        slide: [
            {
                title: messager('Page №1', 'Страница №1', 'Бет №1'),
                text: messager('Not parsed slide №1', 'Не парсируемый слайд №1', 'Талданбайтын слайд №1'),
            },
            {
                title: messager('Page №2', 'Страница №2', 'Бет №2'),
                text: messager('Not parsed slide №2', 'Не парсируемый слайд №2', 'Талданбайтын слайд №2'),
            },
            {
                title: messager('Page №3', 'Страница №3', 'Бет №3'),
                text: messager('Not parsed slide №3', 'Не парсируемый слайд №3', 'Талданбайтын слайд №3'),
            },
            {
                title: messager('Page №4', 'Страница №4', 'Бет №4'),
                text: messager('Not parsed slide №4', 'Не парсируемый слайд №4', 'Талданбайтын слайд №4'),
            },
            {
                title: messager('Page №5', 'Страница №5', 'Бет №5'),
                text: messager('Not parsed slide №5', 'Не парсируемый слайд №5', 'Талданбайтын слайд №5'),
            },
        ],
        form: {
            input: messager('Enter your username', 'Введите имя пользователя', 'Пайдаланушы атыңызды енгізіңіз'),
            popup: messager('is required', 'требуется', 'талап етіледі'),
            textArea: messager('Description...', 'Описание...', 'Сипаттама...'),
            send: messager('Send', 'Отправить', 'Жіберу')
        },
        notification: {
            warning: messager('Warning', 'Предупреждение', 'Ескерту'),
            success: messager('Success', 'Успешно сохранен', 'Сәтті сақталды'),
            error: messager('Error', 'Ошибка', 'Қате'),
            info: messager('Info', 'Информация', 'Ақпарат'),
            description: {
                warning: messager('Take the test', 'Пройди тест', 'Сынақтан өтіңіз'),
                success: messager('Success', '', ''),
                error: messager('Username or text not specified', 'Имя пользователя или текст не указан', 'Пайдаланушы аты немесе мәтін көрсетілмеген'),
                info: messager('Data sent for moderation', 'Данные отправлены на модерацию', 'Деректер модерацияға жіберілді'),
            }
        }
    }

    const send = () => {
        //success/info/warning/error
        if(!state.user.length || !state.text.length){
            notification['error']({
                message: messages.notification.error,
                description: messages.notification.description.error,
            });
        } else {
            if(!state.success){
                notification['warning']({
                    message: messages.notification.warning,
                    description: messages.notification.description.warning,
                });
            } else {
                if(state.text.length > 10){
                    notification['info']({
                        message: messages.notification.info,
                        description: messages.notification.description.info,
                    });
                } else {
                    notification['success']({
                        message: messages.notification.success,
                        description: `${state.user}: ${state.text}`,
                    });
                }
            }
        }
    };

    // console.log('component state => ', {
    //     testState: state,
    //     store: store,
    //     list: list
    // });

    return (
        <div
            className={'parent'}
            // style={{
            //     height: window.innerHeight,
            //     width: window.innerWidth,
            // }}
        >
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={messages.header}
                    // subTitle="This is a subtitle"
                    extra={[
                        <Select key={0} className={'select'} bordered={false} defaultValue="en" onChange={language=>setState({...state, lang: language})}>
                            <Option value="en" style={{}}>English</Option>
                            <Option value="ru">Русский</Option>
                            <Option value="kz">Қазақша</Option>
                            <Option value="kk" disabled>Qazaqs'a</Option>
                        </Select>
                    ]}
                />
                <div className={'image'}>
                    <img width={'100%'} src={'https://sun9-51.userapi.com/s/v1/if2/gtMjPwhrHsG0cq2TAGuzVMv_HDLyBRjbXo4I3PpyyH_1QreAtAcHpNUj6f9yPQBGatdiCU2EGFcjUu0t74ReJ9Z3.jpg?size=984x201&quality=95&type=album'} alt={'image'}/>
                </div>
                <div className={'form'}>
                    <Input
                        placeholder={messages.form.input}
                        style={{marginBottom: 10}}
                        // status={"error"}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        suffix={
                            <Tooltip title={messages.form.popup}>
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                        value={state.user}
                        onChange={e=>setState({...state, user: `${state.user}${e.nativeEvent.data}`})}
                    />
                    <TextArea
                        showCount
                        maxLength={216}
                        style={{ height: 80 }}
                        placeholder={messages.form.textArea}
                        value={state.text}
                        onChange={e=>setState({...state, text: state.text+e.nativeEvent.data})} />
                </div>
                <div className={'verifier'}>
                    <Verifier
                        store={store}
                        action={action}

                        onSuccess={()=>setState({...state, success: true})}
                        onFail={()=>console.log('You are Robot!!')}
                        hash={(collectedHash)=>{
                            if(list.includes(collectedHash))
                                return false;
                            set([...list, collectedHash])
                            return true;
                        }}

                        lang={state.lang}
                    />
                </div>
                <Space className={'space'}>
                    <Button onClick={() => send()}>{messages.form.send}</Button>
                </Space>
                <div className={'slide'}>
                    <Divider orientation="left">{messages.slide[state.current].title}<EditOutlined style={{marginLeft: 10}} /></Divider>
                    {messages.slide.map((item, index)=><div key={index} className={'slideBody'} style={{ transform: `translateX(${390*(-state.current+index)}px)`}}>
                        <div>
                            <Image
                                width={350}
                                height={170}
                                src={"error"}
                                fallback="data:image/png;base64,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"
                            />
                            <div style={{marginTop: 14}}>
                                {item.text}
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            <div className={'pagination'}>
                {[
                    { title: '<', onSuccess: state.current===0? ()=>setState({...state, current: 4}) : ()=>setState({...state, current: state.current-1})},
                    { title: '1', onSuccess: ()=>setState({...state, current: 0})},
                    { title: '2', onSuccess: ()=>setState({...state, current: 1})},
                    { title: '3', onSuccess: ()=>setState({...state, current: 2})},
                    { title: '4', onSuccess: ()=>setState({...state, current: 3})},
                    { title: '5', onSuccess: ()=>setState({...state, current: 4})},
                    { title: '>', onSuccess: state.current===4? ()=>setState({...state, current: 0}) : ()=>setState({...state, current: state.current+1})}
                ].map((paginationElement, index)=>(
                    <Paginator
                        key={index}

                        store={store}
                        action={action}

                        onSuccess={paginationElement.onSuccess}
                        onFail={()=>console.log('You are Robot!!')}
                        hash={(collectedHash)=>{
                            if(list.includes(collectedHash))
                                return false
                            set([...list, collectedHash]);
                            return true;
                        }}
                    >
                        <Button
                            style={{borderColor: index-1===state.current? 'rgb(64 169 255)' : ''}}
                        >
                            {paginationElement.title}
                        </Button>
                    </Paginator>
                ))}
            </div>
        </div>
    );
}

export default Main;
