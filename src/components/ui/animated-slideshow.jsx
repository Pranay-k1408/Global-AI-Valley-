"use client" 

import * as React from "react"
import { MotionConfig, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { clipPathVariants } from "./variants"

function splitText(text) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)

  return {
    words,
    characters,
  }
}

import { HoverSliderContext, useHoverSliderContext } from "./context"
export { useHoverSliderContext } from "./context"

export const HoverSlider = React.forwardRef(({ children, className, defaultSlide = 0, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState(defaultSlide)
  const changeSlide = React.useCallback(
    (index) => setActiveSlide(index),
    [setActiveSlide]
  )
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div ref={ref} className={className} {...props}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

export const WordStaggerHover = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("relative inline-block origin-bottom overflow-hidden", className)}
      {...props}
    >
      {children}
    </span>
  )
})
WordStaggerHover.displayName = "WordStaggerHover"

export const TextStaggerHover = React.forwardRef(({ text, index, children, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { characters } = splitText(text)
  const isActive = activeSlide === index
  const handleMouse = () => changeSlide(index)

  return (
    <span
      className={cn(
        "relative inline-block origin-bottom overflow-hidden cursor-pointer select-none",
        className
      )}
      {...props}
      ref={ref}
      onMouseEnter={handleMouse}
    >
      {characters.map((char, charIndex) => (
        <span
          key={`${char}-${charIndex}`}
          className="relative inline-block overflow-hidden"
        >
          <MotionConfig
            transition={{
              delay: charIndex * 0.025,
              duration: 0.32,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Inactive state: dimmed */}
            <motion.span
              className="inline-block transition-opacity duration-300"
              style={{
                opacity: isActive ? 0.15 : 0.32,
                color: 'var(--text-secondary)'
              }}
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
            >
              {char}
              {char === " " && charIndex < characters.length - 1 && <>&nbsp;</>}
            </motion.span>

            {/* Active state: bold white / gold text sliding up */}
            <motion.span
              className="absolute left-0 top-0 inline-block font-bold"
              style={{
                color: '#ffffff',
                textShadow: '0 0 20px rgba(229, 169, 80, 0.35)'
              }}
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"


export const HoverSliderImageWrap = React.forwardRef(({ className, style = {}, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      style={{
        display: 'grid',
        position: 'relative',
        ...style
      }}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef(({ index, imageUrl, src, alt, className, style = {}, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  const isActive = activeSlide === index

  return (
    <motion.img
      src={src || imageUrl}
      alt={alt || ""}
      className={cn("inline-block align-middle object-cover w-full h-full", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      style={{
        gridArea: '1 / 1 / 2 / 2',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style
      }}
      ref={ref}
      {...props}
    />
  )
})
HoverSliderImage.displayName = "HoverSliderImage"
