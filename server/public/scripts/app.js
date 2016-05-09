$(document).ready(function(){
  $('#load-data').on('click', loadData);
  function loadData() {
    $.ajax({
      type: "GET",
      url: "/data",
         success: function(data) {


           var index = 0;

           for (var i = 0; i < data.mu.length; i++) {
              $('.buttons').append('<button class="button" id ="' + i + '">' + i + '</button>');
          }

          changeData(0);
          var timerID = setInterval(changeData, 15000);
          $('.move').on('click', function() {
              changeData($(this).data('move'));
          });
          $('.buttons').on('click', '.button', function() {
              changeData(Number($(this).attr('id')));
          });

          function changeData(direction = 1) {
              if (direction > 1) {
                  index = direction;
              } else {
                  index += direction;
              }
              if (index < 0) {
                  index = data.mu.length - 1;
              } else if (index > data.mu.length - 1) {
                  index = 0;
              }
              $('.buttons').find('.chosen').removeClass('chosen');
              $('#' + index).addClass('chosen');
              addPerson();
              clearInterval(timerID);
              timerId = setInterval(changeData, 15000);
          }



       function addPerson() {
        console.log(data);
        $('.container').fadeOut("slow", function() {
                    $('.container').children().remove();
                    $('.container').append('<p>Name: ' + data.mu[index].names);
                    $('.container').append('<p>Git Username: ' + data.mu[index].git_username);
                    $('.container').append('<p>Shoutout: ' + data.mu[index].shoutout);
                    $('.container').fadeIn("slow");
                });
      }
}
})



}
});
