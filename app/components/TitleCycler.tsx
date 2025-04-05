"use client"
import React, { useEffect, useState } from "react"
import ShuffleText2 from "./ShuffleText2"

const TitleCycler = ({ titles }: { titles: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length)
      }, 5000)
      
      return () => clearInterval(timer)
    }, [titles.length])
    
    return (
      <div className="text-3xl font-medium text-gray-600">
        <ShuffleText2 text={titles[currentIndex]} />
      </div>
    )
  }

export default TitleCycler;