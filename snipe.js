// はい。これは今やっている画面のやつしか取得できません
// はい。これは国語で使えません。
// はい。これは自動的に進めません
function getCurrentQuestion() {
  var current = $('.question-container.current');
  var currentId = current.attr('id').split('-');
  
  var answer_html = current.html().match(/【(?:答え|解答)】(?:.|\n)*?(?=<|$)/g);
    
  return answer_html;
}

console.log(getCurrentQuestion());
