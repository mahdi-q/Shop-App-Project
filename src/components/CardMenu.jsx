"use client";

import ProductCard from "app/(Main)/products/_components/ProductCard";
import Link from "next/link";
import React, { useRef } from "react";
import { GoArrowLeft } from "react-icons/go";

function CardMenu({ products, query, title }) {
  const containerRef = useRef(null);
  const velocity = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const stopInertia = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
  };

  const inertiaScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    // حرکت تدریجی با کاهش سرعت
    container.scrollLeft -= velocity.current.x;
    container.scrollTop -= velocity.current.y;

    // کاهش سرعت (اصطکاک)
    velocity.current.x *= 0.95;
    velocity.current.y *= 0.95;

    // اگر سرعت خیلی کم شد، متوقف شو
    if (
      Math.abs(velocity.current.x) > 0.5 ||
      Math.abs(velocity.current.y) > 0.5
    ) {
      rafId.current = requestAnimationFrame(inertiaScroll);
    }
  };

  const handleMouseDown = (e) => {
    const container = containerRef.current;
    stopInertia(); // وقتی کاربر دوباره کلیک کرد، اینرسی قبلی رو متوقف کن
    container.isDown = true;
    container.startX = e.pageX - container.offsetLeft;
    container.startY = e.pageY - container.offsetTop;
    container.scrollLeftStart = container.scrollLeft;
    container.scrollTopStart = container.scrollTop;
    container.lastX = e.pageX;
    container.lastY = e.pageY;
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    container.isDown = false;
    inertiaScroll();
  };

  const handleMouseUp = () => {
    const container = containerRef.current;
    container.isDown = false;
    inertiaScroll();
  };

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container.isDown) return;
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop;

    const walkX = x - container.startX;
    const walkY = y - container.startY;

    // محاسبه سرعت
    velocity.current.x = e.pageX - container.lastX;
    velocity.current.y = e.pageY - container.lastY;

    container.scrollLeft = container.scrollLeftStart - walkX;
    container.scrollTop = container.scrollTopStart - walkY;

    container.lastX = e.pageX;
    container.lastY = e.pageY;
  };

  return (
    <div className="min-h-[300px] w-full rounded-lg bg-primary-200/60 py-4 dark:bg-primary-100/20">
      <div className="mb-6 flex items-center justify-between gap-2 px-4 text-black">
        <h2 className="text-base font-medium md:text-xl">{title}</h2>

        <Link
          href={`/products?${query}`}
          className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:text-primary-900 md:text-base"
        >
          <span>
            همه <span className="hidden md:inline-block">محصولات</span>
          </span>
          <GoArrowLeft />
        </Link>
      </div>

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="scroll-none flex h-full cursor-grab touch-pan-x items-stretch gap-4 overflow-x-auto px-4 pb-3"
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="w-[300px] min-w-[300px] self-stretch rounded-lg bg-background"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardMenu;
