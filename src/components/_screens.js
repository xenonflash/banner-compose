export default [
  {
    bgType: "image",
    en: {
      src: "https://files.lingobus.com/material/image/vipkid-birthday-banner-en-3rd-1539678807145.jpg",
      children: [
        {
          type: "button",
          uuid: "dfr98345",
          top: "50px",
          left: "50px",
          styleObj: {
            color: 'orange'
          },
          props: {
            className: "banner-btn"
          },
          children: "welcome to beijing"
        },
        {
          type: "text",
          uuid: "sdf32343f",
          top: "30px",
          left: "70px",
          styleObj: {
            background: 'gray',
            borderRadius: '20px',
          },
          props: {
            className: "banner-text",
          },
          children: "this is good"
        }
      ]
    },
    zh: {
      src: "https://files.lingobus.com/material/image/vipkid-birthday-banner-en-3rd-1539678807145.jpg",
      children: [
        {
          type: 'button',
          uuid: "dfrs234we34",
          top: "50px",
          left: "50px",
          styleObj: {
            color: 'green'
          },
          props: {
            className: "banner-btn",
          },
          children: "北京欢迎你"
        },
        {
          type: 'text',
          uuid: "sdf9809wer",
          top: "50px",
          left: "50px",
          styleObj: {
            color: 'red',
          },
          props: {
            className: "banner-text",
          },
          children: "这个棒极了"
        }
      ]
    }
  },
]