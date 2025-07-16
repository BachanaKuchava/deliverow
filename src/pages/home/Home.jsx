import React from "react";
import './home.scss';

import MainSlider from '../../components/sliders/MainSlider';
import MainAbout from "../../components/aboutSection/MainAbout";
import ServiceSection from "../../components/serviceSection/ServiceSection";
import CreativeSlider from "../../components/sliders/swiper/Swiper";
import Operation from "../../components/operation/Operation";
import MainInfo from "../../components/maininfo/MainInfo";
import MainBlog from "../../components/mainblog/MainBlog";
import MapPricing from "../../components/mapsection/MainMapComponent";


function Home() {
    return ( <>
    <MainSlider />
    {/* <MainAbout /> */}
    <ServiceSection />
    {/* <CreativeSlider />
    <Operation /> */}
    {/* <MainInfo /> */}
    <MapPricing />
    <MainBlog />
    </> );
}

export default Home;