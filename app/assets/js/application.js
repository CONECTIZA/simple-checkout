$(document).ready(function() {
  function updateTotal() {
    var totalValue = 0;

    $('.product-value').each(function() {
      totalValue += parseInt($(this).attr('data-price-unid'));
    });

    $('.cart-subtotal, .cart-value').html('R$ '+totalValue+',00');
  }

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
    $(this).closest('.product-list__item').find('.product-value').attr('data-price-unid', qtd*price);

    updateTotal();
  });

  updateTotal();
});