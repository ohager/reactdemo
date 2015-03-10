//define(  function () {});

(function ($) {
  $.Form = {};

  $.Form.dadosGeraisIsFocus = false;

  $.Form.dadosGeraisFocusElement = null;

  $.Form.dadosGeraisGetPrev = function () {
    return $.Form.dadosGeraisIsFocus === true ? $.Form.dadosGeraisFocusElement.parents('li').prev().prev().find('select,input,textarea') : null;
  };

  $.Form.dadosGeraisGetNext = function () {
    return $.Form.dadosGeraisIsFocus === true ? $.Form.dadosGeraisFocusElement.parents('li').next().next().find('select,input,textarea') : null;
  };

  $.Form.dadosGeraisFocus = function (element) {
    $('#content-list-cards-details .card-item-details').removeClass('active').find('input,select,textarea').each(function () {
      $(this).prev('strong').show();
      $(this).hide();

    });

    element.addClass('active');
    var boxValue = element.find('strong');
    boxValue.hide();

    $.Form.dadosGeraisIsFocus = true;
    $.Form.dadosGeraisFocusElement = element.find('input,select,textarea');

    $.Form.dadosGeraisFocusElement.val('').val(boxValue.text()).show().focus();
  };

  $.Form.dadosGeraisUnfocus = function () {
    var strong = $.Form.dadosGeraisFocusElement.prev('strong');
    $.Form.dadosGeraisFocusElement.val(strong.text()).hide();
    strong.show();

    $.Form.dadosGeraisIsFocus = false;
    $.Form.dadosGeraisFocusElement = null;
  };

  // @todo
  // Script irá passar por esta função quando o usuário der um "enter" em um dos campos de edição dos dados gerais do currículo.
  $.Form.dadosGeraisSubmit = function () {
    $.Form.dadosGeraisFocusElement.val($.Form.dadosGeraisFocusElement.val());
    $.Form.dadosGeraisFocusElement.prev('strong').text($.Form.dadosGeraisFocusElement.val());

    // @todo
    // validação e inserção de registro

    return true;
  };

  $(document).ready(function () {
    // Edição  -> dados gerais
    $('#content-list-cards-details .card-item-details').off('click').on('click', function (e) {
      e.stopPropagation();
      $.Form.dadosGeraisFocus($(this));
    });

    // Edição -> teclas de função nos dados gerais.
    $('#content-list-cards-details .card-item-details input,#content-list-cards-details .card-item-details select,#content-list-cards-details .card-item-details textarea').off('keydown').on('keydown', function (e) {
      switch (e.which) {
        // : Esc
      case 27:
        $.Form.dadosGeraisUnfocus();
        break;

        // : Enter
      case 13:
        if ($.Form.dadosGeraisSubmit() === true) {
          var next = $.Form.dadosGeraisGetNext();
          next.length === 0 ? $.Form.dadosGeraisUnfocus() : next.parents('li').trigger('click');
          next.focus();
        }
        break;

        // : Tab / Shift + Tab
      case 9:
        var target = null;
        e.preventDefault();

        e.shiftKey === false

        // : Tab -> avança um input
        ? target = $.Form.dadosGeraisGetNext()

        // : Shift + Tab -> retrocede um input
        : target = $.Form.dadosGeraisGetPrev();

        target.length === 0 ? $.Form.dadosGeraisUnfocus() : target.parents('li').trigger('click');
        target.focus();

        break;
      }
    });

    // Edição -> blur de inputs em dados gerais
    $('body').click(function () {
      if ($.Form.dadosGeraisIsFocus === true) {

        $.Form.dadosGeraisUnfocus();
      };
    });


  });

})(jQuery);