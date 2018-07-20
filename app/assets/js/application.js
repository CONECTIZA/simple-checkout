$(document).ready(function() {
  $('.product-quantity i').on('click', function() {
    var qtd = parseInt($(this).parent().attr('data-quantity')),
        price = parseInt($(this).closest('.product-list__item').find('.product-value').attr('data-price'));

    if($(this).hasClass('fa-plus')) {
      qtd += 1;

      $(this).parent().attr('data-quantity', qtd);
    } else if($(this).hasClass('fa-minus')) {
      if(qtd > 1) {
        qtd -= 1;

        $(this).parent().attr('data-quantity', qtd);
      }
    }

    $(this).parent().find('p').html(qtd + ' unid.');
    $(this).closest('.product-list__item').find('.product-value strong').html('R$ ' + qtd*price + ',00');
  });
});