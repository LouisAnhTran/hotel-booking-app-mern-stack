import React from 'react'

import './home.css'
import { Navbar } from '../../components/navbar/Navbar.jsx'
import { Header } from '../../components/header/Header'
import { Feature } from '../../components/featured/Feature'
import PropertyList from '../../components/propertyList/PropertyList'
import { FeaturedProperties } from '../../components/featuredProperties/FeaturedProperties'
import { MailList } from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'


export const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Header></Header>
        <div className="homeContainer">
          <Feature></Feature>
          <h1 className="homeTitle">Browse by property type</h1>
          <PropertyList></PropertyList>
          <h1 className="homeTitle">Home guests love</h1>
          <FeaturedProperties></FeaturedProperties>
          <MailList></MailList>
          <Footer></Footer>
        </div>
    </div>
  )
}
