// はい。これは今やっている画面のやつしか取得できません。
// はい。これは国語で使えません。
// はい。これは自動的に進めません。
// はい。これは自動入力ができません。
(function() {
  var intervalId;

  // getCurrentQuestion() 関数の定義
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
        let bTagMatches = answer_html[0].match(/<b>/g); // <b>タグにマッチする部分を全て取得
        let bTagCount = bTagMatches ? bTagMatches.length : 0; // マッチした部分の数を取得

        if (answer_html[0].includes("<b>") && !answer_html[0].includes("，")) {
          console.log("a")
          var answer_text = answer_html.map(function(html) {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = html.replace(/【(?:答え|解答)】/, '').trim();
            return $(tempDiv).text().trim();
          });
          if (bTagCount == 1) {
            console.log(answer_text)
          } else {
            // bタグの中身を正規表現で抽出
            let matches = answer_html[0].match(/<b>(.*?)<\/b>/g).map(function(tag) {
              return tag.replace(/<\/?b>/g, ''); // <b> と </b> を削除
            });
            //console.log(matches); // 結果をコンソールに表示
            // 分割された文字列をループで処理する
            //for (let i = 0; i < matches.length; i++) {
            //  console.log(matches[i]);
            //  $('.answer-input-choices-container dd').filter(function() {
            //    return $(this).find('span').text().trim() === matches[0];
            //  }).trigger("click");
            //}
            // answer-input-itemクラスを持つdiv要素をすべて取得
            let answerItems = $('.question-container.current .answer-input-item');
            // 選択肢回答欄からdata-group-idとdata-item-idを取得
            let choiceItems = $('.choice-items-container dl div');
                        // answer-input-itemクラスを持つdiv要素をすべて取得

            // 要素をID順にソート
            //answerItems.sort(function(a, b) {
            //    let idA = $(a).attr('id').split('-').map(Number);
            //    let idB = $(b).attr('id').split('-').map(Number);
            //    return idA[1] - idB[1] || idA[2] - idB[2];
            //});

            // matchesの内容をidの若い順に<p class="answer-input-text"></p>に挿入
            for (let i = 0; i < matches.length; i++) {
                if (i < answerItems.length) {
                    $('.answer-input-item medium').click();
                    console.log($(answerItems[i]).attr('id'))
                    var b = document.getElementById($(answerItems[i]).attr('id'));
                     
                     // クリックイベントを発火
                     b.click();

                    itemid = getDataByItemId($(answerItems[i]).data('group-id'));
                    //$(".choice-items-container div[data-group-id='" + groupid + "'] dd").data('itemId').trigger("click");
                    //console.log(answer_text[i]);
                    console.log(itemid)
                    $(".answer-input-choices-container div[data-item-id='" + itemid + "'] dd").trigger("click");
                    
                    function getDataByItemId(groupid) {
                      return $(".choice-items-container div[data-group-id='" + groupid + "']").data('itemId');
                    }
                    //tmp_itemId = getDataByGroupId($(answerItems[i]).data('group-id'));
                    //console.log(tmp_itemId)
                    //$(answerItems[i]).find('.answer-input-text').text(matches[i]);
                    ////console.log($(answerItems[i]).data('group-id'));
                    //$(answerItems[i]).find('.answer-input-text').after('<div name="selectedChoice" data-group-id="' + $(answerItems[i]).data('group-id') + '" data-item-id="' + tmp_itemId + '"></div>');
                }
            }
         
            //// data-group-idとdata-item-idを含む要素をフィルタリング
            //let filteredChoiceItems = choiceItems.filter(function() {
            //    return $(this).data('group-id') !== "" && $(this).data('item-id') !== "";
            //});
         //
            //// データを格納するオブジェクトの作成
            //let dataMap = {};
            //filteredChoiceItems.each(function() {
            //    let groupId = $(this).data('group-id');
            //    let itemId = $(this).data('item-id');
            //    let text = $(this).find('dt').text(); // もし必要なら選択肢のテキストを取得できます
            //    if (!dataMap[groupId]) {
            //        dataMap[groupId] = [];
            //    }
            //    dataMap[groupId].push(itemId);
            //});
           //
            //for (let i = 0; i < matches.length; i++) {
            //  console.log(matches[i]);
            //  //$('.answer-input-choices-container dd').filter(function() {
            //  //  return $(this).find('span').text().trim() === matches[0];
            //  //}).trigger("click");
            //}
         
            // データを使ってmatchesの内容を適切な<p class="answer-input-text"></p>に挿入
            //let answerItems = $('.answer-input-item.medium');
            //answerItems.each(function(index) {
            //    let groupId = $(this).data('group-id');
            //    let itemId = dataMap[groupId][index];
            //    $(this).find('.answer-input-text').text(matches[index]);
            //    $(this).find('.answer-input-text').after('<div name="selectedChoice" data-group-id="' + groupId + '" data-item-id="' + itemId + '"></div>');
            //});
          }
        } else {
          console.log("b")
          answer_texts.forEach(function(answer_text) {
            // 答えの選択肢をクリックする処理
            console.log(answer_text)
            
            if (current.find('input.answer-input-text.inputtext').is(':visible')) {
              if (answer_text.includes($('.right.answer_panel span.input_txt01').text())) {
                answer_text = answer_text.replace($('.right.answer_panel span.input_txt01').text(), "")
              }


              if (answer_text.includes("（") || answer_text.includes("(")) {
                console.log("pattern 02x");
                answer_text = answer_text
                  .replace(/（[^））]*）/g, "")
                  .replace(/\([^()]*\)/g, "")
                  .replace(/（[^)]*\)/g, "");
              }

              $('.right.answer_panel div.inputtext_dummy').text(answer_text);
          
              $('.devicekeyboard-enter-button').trigger("click");
              setTimeout(1*5000)
            } else {

  
              // 文字列を個々の文字に分割する
              var characters = answer_text.split("，");
              
              // 分割された文字列をループで処理する
              for (let i = 0; i < characters.length; i++) {
                console.log(characters[i]);
  //             }
  //             for (let i = 1; i < answer_text.length; i++) {
  //               //console.log(`iの値は ${i}`);
  //               console.log(answer_text[i])
                $('.answer-input-choices-container dd').filter(function() {
                  return $(this).find('span').text().trim() === characters[i];
                }).trigger("click");
              }
              //$('.answer-input-choices-container dd').filter(function() {
              //  return $(this).find('span').text().trim() === answer_text[0];
              //}).trigger("click");
          
              $('.choice-enter-button').trigger("click");
              setTimeout(1*5000)
              
            }
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
  }

  // スクリプトの実行を開始する関数
  function startInterval() {
    intervalId = setInterval(getCurrentQuestion, 2000);
  }

  // スクリプトの実行を停止する関数
  function stopInterval() {
    clearInterval(intervalId);
  }

  // コンソールに開始と停止のための関数を提供
  window.startInterval = startInterval;
  window.stopInterval = stopInterval;

  // 開始と停止のためのメッセージを表示
  console.log('To start the interval, type: startInterval()');
  console.log('To stop the interval, type: stopInterval()');
})();
