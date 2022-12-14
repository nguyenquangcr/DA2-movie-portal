import React,{useEffect,useState} from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../../parts/header';
import SidebarLeft from '../../parts/sidebar';
import {connect,useDispatch} from 'react-redux';
import { getCinemaSystem, getLocationMovie, getMovieListAdminShowtime,postShowTime } from '../../services/showtimes';

const Lichchieu1 = (props) => {
    const { t, i18n } = useTranslation();
    document.title = t('global:label_global_cinema_system');
    const dispatch = useDispatch();



    const [maPhim, setMaPhim] = useState('');
    const [maRap, setMaRap] = useState('');
    const [maHeThongRap, setMaHeThongRap] = useState('BHDStar');
    const [maCumRap, setMaCumRap] = useState('');
    const [date, setDate] = useState('');
    const [time,setTime] = useState('');
    const [price, setPrice] = useState('');
    useEffect(() => {
        dispatch(getMovieListAdminShowtime());
        dispatch(getCinemaSystem());
        dispatch(getLocationMovie(maHeThongRap));
    }, [dispatch,maHeThongRap])
    const renderMovieList = () =>{
        return props.movieList && props.movieList.map((item,index)=>{
            return(
                <option key={index} value={item.maPhim}>{item.tenPhim}</option>
            )
        })
    }

    //lay ma phim
    const onChangeMaPhim = (e) =>{
        setMaPhim(e.target.value);
    }

    const renderCinemaSystem = () =>{
        return props.cynemaSystem && props.cynemaSystem.map((item,index)=>{
            return(
                <option key={index} value={item.maHeThongRap}>{item.tenHeThongRap}</option>
            )
        })
    }

    //lay ma he thong rap
    const onChangeMaHeThongRap = (e) =>{
        setMaHeThongRap(e.target.value);
    }
    const renderListTheater = () =>{
        return props.listTheater && props.listTheater.map((item,index)=>{
            return(
                <option key={index} value={item.maCumRap}>{item.tenCumRap}</option>
            )
        })
    }
    
    //lay ma cum rap
    const onChangeMaCumRap = (e) =>{
        setMaCumRap(e.target.value);
    }

    const renderListLocation = () =>{
        return props.listTheater && props.listTheater.map((item,index)=>{
            if(item.maCumRap === maCumRap){
                return item.danhSachRap.map((rap,index)=>{
                    return(
                        <option key={index} value={rap.maRap}>{rap.tenRap}</option>
                    )
                })
            }
        })
    }

    //lay ma rap
    const onChangeMaRap = (e) =>{
        setMaRap(e.target.value);
    }

    //lay ng??y
    const onChangeDate = (e) =>{
        setDate(e.target.value);
    }

    //l???y gi???
    const onChangeTime = (e) =>{
        setTime(e.target.value);
    }
    //l???y gi?? 
    const onChangePrice = (e) =>{
        setPrice(e.target.value);
    }

    //t???o l???ch chi???u
    const onClickShowTime = () =>{
        dispatch(postShowTime(maPhim,date,time,maRap,price));
    }
    
    return (
        <div className="mainpage-main">
            <Header />
            <div className="contain-main">
                <SidebarLeft />
                <div className={`right-main ${window.innerWidth < 922 ? 'full' : ''}`} rel="js-right-main">
                    <ul className="breadcrumb">
                    <li><a href="/ban-lam-viec">{t('global:label_global_dashboard')}</a></li>
                    <li>{t('global:label_global_cinema_system')}</li>
                </ul>
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-12'>
                                <select onChange={e => onChangeMaPhim(e)}>
                                    <option value="" selected disabled hidden>Ch???n phim</option>
                                    {renderMovieList()}
                                </select>
                            </div>
                            <div className='col-12'>
                                <select onChange={e => onChangeMaHeThongRap(e)}>
                                    <option value="" selected disabled hidden>Ch???n h??? th???ng r???p</option>
                                    {renderCinemaSystem()}
                                </select>
                            </div>
                            <div className='col-12'>
                                <select onChange={e => onChangeMaCumRap(e)}>
                                    <option value="" selected disabled hidden>Ch???n m?? c???m r???p</option>
                                    {renderListTheater()}
                                </select>
                            </div>
                            <div className='col-12'>
                                <select onChange={e => onChangeMaRap(e)}>
                                    <option value="" selected disabled hidden>Ch???n rap</option>
                                    {renderListLocation()}
                                </select>
                            </div>
                            <div className='col-12'>
                                <input type='text' placeholder='Ch???n ng??y chi???u' onChange={e=>onChangeDate(e)} />
                            </div>
                            <div className='col-12'>
                                <input type='text' placeholder='Ch???n gi?? chi???u' onChange={e=>onChangeTime(e)}/>
                            </div>
                            <div className='col-12'>
                                <input type='text' placeholder='Gi?? v??' onChange={e=>onChangePrice(e)}/>
                            </div>
                            <div className='col-12'>
                                <button onClick={()=>onClickShowTime()}>T???o L???ch Chi???u</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        movieList: state.showtime.movieList,
        cynemaSystem: state.showtime.cinemaSystem,
        listTheater: state.showtime.listTheater
        // movieDetailShowTime: state.showtimeReducer.detailShowTime,
    }
}

export default connect(mapStateToProps)(Lichchieu1);
