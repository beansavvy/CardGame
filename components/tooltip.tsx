import React, { useState, useRef, useEffect, useCallback } from 'react';
import '@styles/tooltipStyle.css';

const Tooltip = ({ children, content, location, npc }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, tailLeft: 0 });
  const [isAbove, setIsAbove] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const parentRect = triggerRef.current.offsetParent.getBoundingClientRect();

    console.log('trigger rect:', triggerRect);
    console.log('parent rect: ', parentRect);
    console.log('tooltip rect: ', tooltipRect);

    // Calculate top and left positions relative to the parent container
    let top = triggerRect.bottom - parentRect.top + 10;
    let left =
      triggerRect.left -
      parentRect.left +
      (triggerRect.width - tooltipRect.width) / 2;

    // Ensure the tooltip stays within the parent container's boundaries
    console.log('LEFT VAL' + left);
    if (left < 0) {
      left = 0;
    } else if (left > parentRect.width) {
      left = parentRect.width - tooltipRect.width;
    }

    // Adjust tail position to ensure it is centered relative to the trigger element
    let tailLeft =
      triggerRect.left - parentRect.left + triggerRect.width / 2 - left;

    // If tooltip overflows below the viewport, place it above the trigger element
    if (top + tooltipRect.height > window.innerHeight - 10) {
      top = triggerRect.top - parentRect.top - tooltipRect.height - 10;
      setIsAbove(true);
    } else {
      setIsAbove(false);
    }

    setPosition({ top, left, tailLeft });
  }, []);

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  useEffect(() => {
    const tooltipTrigger = triggerRef.current;

    if (tooltipTrigger) {
      tooltipTrigger.addEventListener('mouseenter', showTooltip);
      tooltipTrigger.addEventListener('mouseleave', hideTooltip);

      return () => {
        tooltipTrigger.removeEventListener('mouseenter', showTooltip);
        tooltipTrigger.removeEventListener('mouseleave', hideTooltip);
      };
    }
  }, []);

  useEffect(() => {
    if (visible) {
      calculatePosition();
    }
  }, [visible, calculatePosition]);

  const renderContent = () => {
    if (location) {
      return (
        <>
          <span className="tooltiptext-header">{location.name}</span>
          {location.description}
        </>
      );
    }

    if (npc) {
      return (
        <>
          <span className="tooltiptext-header">{npc.name}</span>
          {npc.type.charAt(0).toUpperCase() + npc.type.slice(1)}
        </>
      );
    }

    return content;
  };

  return (
    <>
      <span className="tooltippopup-child-wrapper" ref={triggerRef}>
        {children}
      </span>
      {visible && (
        <div
          ref={tooltipRef}
          className="tooltippopup"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
          {renderContent()}
          <div
            className={`tooltip-tail ${
              isAbove ? 'tooltip-tail-above' : 'tooltip-tail-below'
            }`}
            style={{ left: `${position.tailLeft}px` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Tooltip;
