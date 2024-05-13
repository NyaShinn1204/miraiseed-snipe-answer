// はい。これは今やっている画面のやつしか取得できません。
// はい。これは国語で使えません。
// はい。これは自動的に進めません。
// はい。これは自動入力ができません。
function getCurrentQuestion() {
  var current = $('.question-container.current');
  var currentId = current.attr('id').split('-');
  
  var answer_html = current.html().match(/【(?:答え|解答)】(?:.|\n)*?(?=<|$)/g);
  
  var answer_text = answer_html.map(function(html) {
    return html.replace(/【(?:答え|解答)】/, '').trim();
  });

  $('.answer-input-choices-container dd').filter(function() {
    return $(this).find('span').text().trim() === answer_text[0];
  }).trigger("click");

  $('.choice-enter-button').trigger("click")
  setTimeout(function(){}, Math.random()*1200)
  $('.description-pane-next-icon next').trigger("click")

      
  return answer_text;
}
getCurrentQuestion();
