// はい。これは今やっている画面のやつしか取得できません。
// はい。これは国語で使えません。
// はい。これは自動的に進めません。
// はい。これは自動入力ができません。
function getCurrentQuestion() {
  var current = $('.question-container.current');
  var currentId = current.attr('id').split('-');
  
  // 答えや解答を含む部分を正規表現で検索
  var answer_html = current.html().match(/【(?:答え|解答)】([\s\S]*?)(?=<\/font>|<\/div>|<div|<br|<p|【|$)/g);
  
  if (!answer_html || answer_html.length === 0) {
    console.error("Answer not found");
    return;
  }

  // "答え"の部分だけを抽出し、HTMLタグを含むテキストを処理
  var answer_texts = answer_html.map(function(html) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = html.replace(/【(?:答え|解答)】/, '').trim();
    return $(tempDiv).text().trim();
  });

  //answer_texts_dev_01 = answer_texts.forEach(function(){})
  //console.log(answer_texts_dev_01)

  console.log(answer_html)

  if (answer_html.length > 1) {
    console.log("true")

    answer_texts.forEach(function(answer_text) {
      // <input type="text" class="answer-input-text inputtext"> が存在する場合
      if (current.find('input.answer-input-text.inputtext').length > 0) {
        $('.answer.direct').trigger("click");
        current.find('input.answer-input-text.inputtext').val(answer_text[0]);
    
        $('.devicekeyboard-enter-button').trigger("click");
        setTimeout(1*5000)
      } else {
        // 答えの選択肢をクリックする処理
        $('.answer-input-choices-container dd').filter(function() {
          return $(this).find('span').text().trim() === answer_text[0];
        }).trigger("click");
    
        $('.choice-enter-button').trigger("click");
        setTimeout(1*5000)
      }
    });

  } else {
    console.log("false")
    var answer_text = answer_html.map(function(html) {
      return html.replace(/【(?:答え|解答)】/, '').trim();
    });

    if (answer_html.length == 1) {
      console.log(answer_html[0].includes("，"))
      if (answer_html[0].includes("<b>") && !answer_html[0].includes("，")) {
        console.log("a")
        var answer_text = answer_html.map(function(html) {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = html.replace(/【(?:答え|解答)】/, '').trim();
          return $(tempDiv).text().trim();
        });
        console.log(answer_text)
      } else {
        console.log("b")
        answer_texts.forEach(function(answer_text) {
          // 答えの選択肢をクリックする処理
          console.log(answer_text)
          for (let i = 1; i < answer_text.length; i++) {
            //console.log(`iの値は ${i}`);
            console.log(answer_text[i])
            $('.answer-input-choices-container dd').filter(function() {
              return $(this).find('span').text().trim() === answer_text[i];
            }).trigger("click");
          }
          //$('.answer-input-choices-container dd').filter(function() {
          //  return $(this).find('span').text().trim() === answer_text[0];
          //}).trigger("click");
      
          $('.choice-enter-button').trigger("click");
          setTimeout(1*5000)
          
        });
      }
    }

    $('.answer-input-choices-container dd').filter(function() {
      return $(this).find('span').text().trim() === answer_text[0];
    }).trigger("click");
  
    $('.choice-enter-button').trigger("click")
    setTimeout(1*5000)
  }

  setTimeout(function() {
    $('.description-pane-next-icon').trigger("click");
  }, 2000);

  if ($('.dialogclose').is(':visible')) {
    $('.dialogclose').trigger("click");
  }
  
  // 抽出した答えのテキストを返す
  //console.log(current.html())
  //console.log(answer_html)
  return answer_text;
}

// 正しい答えをクリックまたは入力する
getCurrentQuestion();
