/*
モーダル
*/
const app = new Vue({
  el: '#header',
  components: {
    // ComonHeader
    'open-modal': {
      template: `
    <div id="overlay" v-on:click="clickEvent">
        <div id="content">
          <p><slot></slot></p>
          <button v-on:click="clickEvent">close</button>
        </div>
    </div>
    `,
      methods: {
        clickEvent: function() {
          this.$emit('from-child')
        }
      }
    }

  },
  data: {
    showContent: '',
    isLogin: false,//is＝判定
  },
  
  
  methods: {
    openModal: function(val='') {
      this.showContent = val
    },
    closeModal: function() {
      this.showContent = ''
    },
    login: function() {
      this.isLogin=true
    },
    logout: function() {
    this.isLogin=false 
    },
    trashAlert: function(){
    alert("削除しました。"); 
    }
  }
})
// ボタンのVueインスタンスモーダル部分
new Vue({
  el: '#modalBtn',
  data: {
    mention: ''
  },
  methods: {
    execute: function() {
      bus.$emit('click.trigger');
      bus.$emit('deleteUserName.trigger', this.mention);
    }
  }
})
/*
アラート
*/
const icon=new Vue({
  el:'#app-icon',
  
  methods: {
    cartAlert: function() {
      alert("カートに追加しました");
    },
    favoriteAlert: function() {
      alert("お気に入りに追加しました。");
    },
  }
});
/*
スライドショー
*/
const slide=new Vue({
  el:'#slider-outer',
   data: {
    current_slide: 0,
    slides: [
      { img: 'images/intro01.jpeg' },
      { img: 'images/intro02.jpg' },
      { img: 'images/intro03.jpg' },
      { img: 'images/intro04.jpeg' },
      { img: 'images/kitalla01.jpg' }
    ],
  },
  mounted() {
    setInterval(() => {
      this.current_slide = this.current_slide < this.slides.length - 1 ? this.current_slide + 1 : 0
    }, 5000)
  }, 
})

/*
詳細ページの写真のタブ
*/
new Vue({
  el: '#example',
  data: {
    activeTab: 'tabs-1',
  },
});


/*
フェードイン
*/

$(function() {
  $(window).scroll(function() {
    $('.news').each(function() {
      const elemPos = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll > elemPos - windowHeight + 150) {
        $(this).addClass('scrollin');
      }
    });
  });
});


// ボタンの表示／非表示を切り替える関数
const updateButton = () => {
  if ($(window).scrollTop() >= 300) {
    // 300px以上スクロールされた
    $('.back-to-top').fadeIn();
  } else {
    $('.back-to-top').fadeOut();
  }
};

// updateButtonを実行
$(window).on('scroll', updateButton);
$('.back-to-top').on('click', (e) => {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 600);
});

updateButton();

const contentsTop = $('#contents').offset().top;
$('html, body').animate({ scrollTop: contentsTop }, 600);


