$(document).ready(function() {
  function updateTotal() {
    var totalValue = 0;

    $('.product-value').each(function() {
      totalValue += parseInt($(this).attr('data-price-unid'));
    });

    $('.cart-subtotal, .cart-value').html('R$ '+totalValue+',00');
  }

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

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

  $('input[name="email"]').keypress(function() {
    var _this = this;

    setTimeout(function() {
      if($(_this).is(':valid')) {
        $('.form-group--email h1').html('Clique em prosseguir');
        $('.form-group--email .btn-finish').hide();
        $('.btn-prosseguir').show();
        $(this).removeClass('is-invalid').addClass('.is-valod');
        $('.login-social-bottom').hide();
      } else {
        $(this).addClass('is-invalid');
      }
    }, 1000);
  });

  $('.btn-prosseguir').on('click', function() {
    $('input[name="email"]').attr('disabled', 'true');
    $(this).hide();
    $('.form-group--email h1').html('Validando e-mail...');
    setTimeout(function() {
      $('.form-group--email h1').html('Validando e-mail... Concluído.');
      $('.user-email').html($('input[name="email"]').val());
      $('.form-group--login .btn-finish').show();

      setTimeout(function() {
        $('.form-group--email').hide();
        $('.form-group--login').show();
      }, 1000);
    }, 2000);
  });

  $('.form-group--login .btn-finish').on('click', function() {
    if($('input[name="password-login"]').val().length > 0) {
      $('.form-group--login').hide();
      $('.form-group--nova-conta').show();
    }
  });

  $('input[name="cep"]').keypress(function() {
    var _this = this;

    setTimeout(function() {
      var val = $(_this).val();

      $.ajax({
        url: 'https://viacep.com.br/ws/'+ val +'/json',
        Accept: "text/plain; charset=utf-8",         
                "Content-Type": "text/plain; charset=utf-8"
      }).done(function(data) {
        $('input[name="logadouro"]').val(data.logradouro).attr('disabled', 'true');
        $('input[name="bairro"]').val(data.bairro).attr('disabled', 'true');
        $('input[name="estado"]').val(data.uf).attr('disabled', 'true');
      });
    }, 1000);
  });

  $('.form-group--nova-conta .btn-finish').on('click', function() {

    $('.user-name').html($('input[name="nome"]').val() + ' '+ $('input[name="sobrenome"]').val());
    $('.user-address-01').html($('input[name="logadouro"]').val() + ', ' + $('input[name="numero"]').val());
    $('.user-address-02').html($('input[name="bairro"]').val());
    $('.user-address-03').html($('input[name="estado"]').val());
    $('.user-address-04').html($('input[name="cep"]').val());

    $(this).closest('.form-group--nova-conta').hide();
    $('.form-group--entrega').show();
  });

  $('.form-group--entrega .btn-finish').on('click', function() {
    $(this).closest('.form-group--entrega').hide();
    $('.form-group--pagamento').show();
  });

  updateTotal();
});