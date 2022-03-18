import React, { useState, useEffect, useRef } from 'react';
import { buildClasses } from 'helpers/utilityHelpers';
import './Tabs.scss';

const buffer = 0.5;
const margin = buffer / 2;

const Tabs = props => {
  const { content, activeColor, inactiveColor, className, ...rest } = props;

  const slider = useRef();
  const tabNames = useRef();

  const [ activeTab, setActiveTab ] = useState(content?.[0]?.name);
  const [ sliderStyle, setSliderStyle ] = useState({
    opacity: 0,
    backgroundColor: activeColor,
    width: `calc(100% / ${content.length} - ${buffer}rem)`,
    transform: `translateX(${margin}rem)`
  });

  useEffect(() => {
    if (slider.current && tabNames.current) {
      const resizeObserver = new ResizeObserver(posX);
      resizeObserver.observe(slider.current)
    }
  }, [activeTab]);

  function posX() {
    if (slider?.current && tabNames?.current) {
      const index = content.findIndex(tab => activeTab === tab.name);
      const sliderWidth = slider.current?.clientWidth / 16;
      const tabNamesHeight = tabNames.current?.clientHeight / 16;
      const posX = sliderWidth * index;
      const posXMargin = buffer * index;
      const updatedPosX = posX + posXMargin + margin;
      const offset = `-${tabNamesHeight - margin}rem`;
      const newStyle = {
        ...sliderStyle,
        opacity: 1,
        height: `calc(${tabNamesHeight}rem - ${buffer}rem)`,
        top: offset,
        marginBottom: offset,
        transform: `translateX(${index === -1 ? margin : updatedPosX}rem)`
      };

      setSliderStyle?.(newStyle);
    }
  };

  const buildTabs = () => (
    <div>
      <div ref={tabNames} className="tabNames" style={{ backgroundColor: inactiveColor }}>
        {content?.map((tab, index) => {
          const classes = [
            { condition: activeTab === (tab.name ?? ""), name: "active" },
          ];

          return (
            <div
              key={index}
              className={buildClasses(classes, "name")}
              onClick={() => {
                if (activeTab !== tab.name) setActiveTab(tab.name);
              }}
            >
              {tab.name}
            </div>
          );
        })}
      </div>

      <div ref={slider} className="tabSlider" style={sliderStyle} />
    </div>
  );

  const buildContent = () => (
    <div className="tabContent">
      {content?.map((tab, index) => {
        if (tab && activeTab === tab.name) {
          return (
            <div key={index} className="content">
              {tab.content}
            </div>
          );
        }
      })}
    </div>
  );

  return (
    <div className={`tabContainer ${className || ""}`} {...rest}>
      {buildTabs()}
      {buildContent()}
    </div>
  );
};

export default Tabs;