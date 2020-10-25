// Flickr API key
const apiKey = '2c608a8f01c034e7f15924a9ac5fd352';

const getFlickrImageURL = (photo, size) => {
  let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
    photo.secret
  }`;
  if (size) {
    url += `_${size}`;
  }
  url += '.jpg';
  return url;
};

// Flickr画像の元ページのURLを返す
const getFlickrPageURL = photo => `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;

// Flickr画像のaltテキストを返す
const getFlickrText = (photo) => {
  let text = `"${photo.title}" by ${photo.ownername}`;
  if (photo.license === '4') {
    text += ' / CC BY';
  }
  return text;
};

const parameters = $.param({
  method: 'flickr.photos.search',
  api_key: apiKey,
  text: 'prosciutto', // 検索テキスト
  sort: 'interestingness-desc', // 興味深さ順
  per_page: 84, // 取得件数
  license: '4', // Creative Commons Attributionのみ
  extras: 'owner_name,license', // 追加で取得する情報
  format: 'json', // レスポンスをJSON形式に
  nojsoncallback: 1, // レスポンスの先頭に関数呼び出しを含めない
});
const url = `https://api.flickr.com/services/rest/?${parameters}`;
console.log(url);


$.getJSON(url, (data) => {
  console.log(data);

  if (data.stat !== 'ok') {
    console.error('データの取得に失敗しました。');
    return;
  }


  const $div = $('<div>');

  $div.append(`<div>${data.photos.total} photos in total</div>`);

  for (let i = 0; i < data.photos.photo.length; i++) {
    const photo = data.photos.photo[i];
    const photoText = getFlickrText(photo);


    $div.append(
      $('<a>', {
        href: getFlickrPageURL(photo),
        class: 'd-inline-block',
        target: '_blank', // リンクを新規タブで開く
        'data-toggle': 'tooltip',
        'data-placement': 'bottom',
        title: photoText,
      }).append(
        $('<img>', {
          src: getFlickrImageURL(photo, 'q'),
          width: 300,
          height: 300,
          alt: photoText,
        }),
      ),
    );
  }
  $div.appendTo('#main');

  $('[data-toggle="tooltip"]').tooltip();
});
