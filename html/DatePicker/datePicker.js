(function (window) {
  var datepicker = window.datepicker;

  var isOpen = false;

  var $wrapper;
  var today = new Date();

  // 页面的render函数
  datepicker.render = function (direction) {
    var year, month;
    var html = datepicker.buildUI(year, month);
    // console.log('html', html);
    $wrapper = document.querySelector('.ui-datePicker-wrapper');
    $wrapper.innerHTML = html;
  };

  // 页面的入口函数
  datepicker.init = function ($input) {
    // $input.addEventListener('click', function(){
    //   if (isOpen) {
    //     $wrapper.classList.remove('ui-datePicker-wrapper-show');
    //     isOpen = false;
    //   } else {
    //     $wrapper.classList.add('ui-datePicker-wrapper-show');
    //     var left = $input.offsetLeft;
    //     var top = $input.offsetTop;
    //     var height = $input.offsetHeight;

    //     $wrapper.style.top = top + height + 8 + 'px';
    //     $wrapper.style.left = left + 2 +'px';

    //     isOpen = true;
    //   }
    // }, false);

    // $wrapper.addEventListener('click', function(e){
    //   var $target = e.target;

    //   if (!$target.classList.contains('ui-datePicker-btn')) return;
    //   if ($target.classList.contains('ui-datePicker-prev-btn')) {

    //   datepicker.render('prev');

    //   } else if ($target.classList.contains('ui-datePicker-next-btn')) {
    //     datepicker.render('next');
    //   }
    // }, false);

    // $wrapper.addEventListener('click', function(e){
    //   var $target = e.target;
    //   if($target.tagName.toLowerCase() !=='td') return;

    //   var date = new Date(monthDate.year,monthDate.month-1, $target.dataset.date);

    //   $input.value = format(date);
    //   $wrapper.classList.remove('ui-datePicker-wrapper-show');
    //   isOpen = false;
    // }, false);

    datepicker.render();
  };

  // 日历组件的函数
  datepicker.buildUI = function (year, month) {
    monthDate = datepicker.getMonthDate(year, month);

    var html =
      '<div class="ui-datePicker-header">' +
      '<a href="#" class="ui-datePicker-btn ui-datePicker-prev-btn">&lt;</a>' +
      '<a href="#" class="ui-datePicker-btn ui-datePicker-next-btn">&gt;</a>' +
      '<span class="ui-datePicker-curr-month">' +
      monthDate.year +
      '-' +
      monthDate.month +
      '</span>' +
      '</div>' +
      '<div class="ui-datePicker-body">' +
      '<table >' +
      '<thead>' +
      '<tr>' +
      '<th>一</th>' +
      '<th>二</th>' +
      '<th>三</th>' +
      '<th>四</th>' +
      '<th>五</th>' +
      '<th>六</th>' +
      '<th>七</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    for (var i = 0; i < monthDate.days.length; i++) {
      var date = monthDate.days[i];

      if (i % 7 === 0) {
        html += '<tr>';
      }

      if (date.date <= 0) {
        html +=
          '<td data-date = ' +
          date.date +
          ' class = "notThisMonth">' +
          date.showDate +
          '</td>';
      } else if (date.date > date.showDate) {
        html +=
          '<td data-date = ' +
          date.date +
          ' class = "notThisMonth">' +
          date.showDate +
          '</td>';
      } else if (
        date.showDate == today.getDate() &&
        monthDate.month == today.getMonth() + 1 &&
        monthDate.year == today.getFullYear()
      ) {
        html +=
          '<td data-date = ' +
          date.date +
          ' class = "on">' +
          date.showDate +
          '</td>';
      } else {
        html += '<td data-date = ' + date.date + '>' + date.showDate + '</td>';
      }

      if (i % 7 === 6) {
        html += '</tr>';
      }
    }

    html += '</tbody>' + '</table>' + '</div>';
    return html;
  };

  // 一个工具函数，将Date对象转化成YYYY-MM-DD的格式
  function format(date) {
    var ret = '';
    var padding = function (num) {
      if (num <= 9) {
        return '0' + num;
      } else {
        return num;
      }
    };

    ret += date.getFullYear() + '-';
    ret += padding(date.getMonth() + 1) + '-';
    ret += padding(date.getDate());

    return ret;
  }

  console.log('datepicker', datepicker);
})(window);
