export const buttonTpl = {
  type: "button",
  styleObj: {
    top: "100px",
    left: "200px",
    background: '#ffe500',
    width: '200px',
    height: '50px',
    borderRadius: '25px',
    textAlign: 'center',
    lineHeight: '50px',
    padding: '0',
    border: '0',
    outline: '0',
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  props: {
    className: "banner-btn",
  },
  children: "请输入按钮文字"
}
export const textTpl = {
  type: "text",
  styleObj: {
    top: "100px",
    left: "200px",
    background: 'rgba(255,255,255,.3)',
    width: '100px',
    height: '50px',
    borderRadius: '2px',
    textAlign: 'left',
    lineHeight: '20px',
    padding: '0',
    border: '0',
    outline: '0',
    color: 'green',
    fontSize: '20px',
  },
  props: {
    className: "banner-text",
  },
  children: "请输入文字"
}

export const imageTpl = {
  type: "image",
  styleObj: {
    top: "100px",
    left: "200px",
    width: '100px',
    height: '100px',
    borderRadius: '25px',
    padding: '0',
    border: '0',
    outline: '0'
  },
  props: {
    src: require('../assets/default-img.png'),
    className: "banner-img",
  }
}