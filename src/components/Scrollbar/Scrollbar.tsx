
interface ScrollbarProps {
  style?: React.CSSProperties
}

export const renderTrack: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const trackStyle: React.CSSProperties = {
    position: "absolute",
    maxWidth: "100%",
    width: 6,
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};



export const renderTrackRTL: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const trackStyle: React.CSSProperties = {
    position: "absolute",
    width: 6,
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: "unset",
    left: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};
export const renderThumbDark: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: "rgba(222, 222, 222, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
export const renderThumbLight: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: "rgba(48, 48, 48, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
export const renderView: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const viewStyle: React.CSSProperties = {
    marginRight: -22,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};
export const renderViewRTL: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const viewStyle: React.CSSProperties = {
    marginRight: "unset",
    marginLeft: -15,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};

export const kanbanRenderTrack: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const trackStyle: React.CSSProperties = {
    width: 6,
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};
export const kanbanRenderThumbDark: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: "rgba(222, 222, 222, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
export const kanbanRenderThumbLight: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: "rgba(48, 48, 48, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
export const kanbanRenderView: React.FC<ScrollbarProps> = ({ style, ...props }) => {
  const viewStyle: React.CSSProperties = {
    position: "relative",
    marginRight: -15,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};