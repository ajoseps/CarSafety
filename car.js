$( document ).ready(function() {
  yearSelect();
  makeSelect();
  modelSelect();
  specificModelSelect();
});

$('#make-select').click(makeSelect);

$('#model-select').click(modelSelect);

$('#specific-model-select').click(specificModelSelect);

$('#get-info-button').submit(function(event){
  console.log($('input:first').val());
});

$('#year-select').change(makeSelect);

$('#make-select').change(modelSelect);

$('#model-select').change(specificModelSelect);

function formatRequestToAPI(param){
  // Formatting URL
  var apiURL = 'http://www.nhtsa.gov/webapi/api/SafetyRatings';
  var apiParam = '';
  var outputFormat = '?format=json';
  var callback = '?callback=myCallback'

  switch(param){
    case 'ModelYear':
      break;
    case 'Make':
      var year = $('#year-select').find(':selected').text();
      apiParam = '/modelyear/' + year + '/';
      break;
    case 'Model':
      var year = $('#year-select').find(':selected').text();
      var make = $('#make-select').find(':selected').text();
      apiParam = '/modelyear/' + year + '/make/' + make + '/';
      break;
    case 'VehicleDescription':
      var year = $('#year-select').find(':selected').text();
      var make = $('#make-select').find(':selected').text();
      var model = $('#model-select').find(':selected').text();
      apiParam = '/modelyear/' + year + '/make/' + make + '/model/' + model + '/';
      break;
    default:
      console.log('Wrong Parameter Specified');
  }
  return apiURL+apiParam+outputFormat+callback;
}

function sendRequestToApi(callback, requestURL, param){
  var listItems = [];
  // Sending Request
  $.ajax({
    url: requestURL,
    dataType: 'jsonp',
    success: function(data){
      $.each(data['Results'],function(){
        $.each(this, function(k,v){
          if(k == param){
            var yearItem = '<option value='+v+'>'+v+'</option>';
            listItems.push(yearItem);
            console.log(listItems.length);
          }
        });
      });
    }
  });
  console.log(listItems.length);
  return listItems;
}

function yearSelect(){
  var param = 'ModelYear';
  var requestURL = formatRequestToAPI(param);
  var yearSelectDropdownItems = sendRequestToApi(requestURL, param);
  $.each(yearSelectDropdownItems, function(index,value){
    $('#year-select').append(value);
  });
  // // Formatting URL
  // var apiURL = 'http://www.nhtsa.gov/webapi/api/SafetyRatings';
  // var apiParam = '';
  // var outputFormat = '?format=json';
  // var callback = '?callback=myCallback'
  // var requestURL = apiURL+apiParam+outputFormat+callback;

  // // Sending Request
  // $.ajax({
  //   url: requestURL,
  //   dataType: 'jsonp',
  //   success: function(data){
  //     $.each(data['Results'],function(){
  //       $.each(this, function(k,v){
  //         if(k == 'ModelYear'){
  //           var yearItem = '<option value='+v+'>'+v+'</option>';
  //           $('#year-select').append(yearItem);
  //         }
  //       });
  //     });
  //   }
  // });
}

function makeSelect(){
  // Formatting URL
  var apiURL = 'http://www.nhtsa.gov/webapi/api/SafetyRatings';
  var year = $('#year-select').find(':selected').text();
  year = year !== '' ? year : '2015';
  var apiParam = '/modelyear/' + year + '/';
  var outputFormat = '?format=json';
  var callback = '?callback=myCallback'
  var requestURL = apiURL+apiParam+outputFormat+callback;

  // Sending Request
  $.ajax({
    url: requestURL,
    dataType: 'jsonp',
    success: function(data){
      $.each(data['Results'],function(){
        $.each(this, function(k,v){
          if(k == 'Make'){
            var makeItem = '<option value='+v+'>'+v+'</option>';
            $('#make-select').append(makeItem);
          }
        });
      });
    }
  });
}

function modelSelect(){
  // Formatting URL
  var apiURL = 'http://www.nhtsa.gov/webapi/api/SafetyRatings';
  var year = $('#year-select').find(':selected').text();
  year = year !== '' ? year : '2015';
  var make = $('#make-select').find(':selected').text();
  make = make !== '' ? make : 'Acura';
  var apiParam = '/modelyear/' + year + '/make/' + make + '/';
  var outputFormat = '?format=json';
  var callback = '?callback=myCallback'
  var requestURL = apiURL+apiParam+outputFormat+callback;

  // Sending Request
  $.ajax({
    url: requestURL,
    dataType: 'jsonp',
    success: function(data){
      $.each(data['Results'],function(){
        $.each(this, function(k,v){
          if(k == 'Model'){
            var modelItem = '<option value='+v+'>'+v+'</option>';
            $('#model-select').append(modelItem);
          }
        });
      });
    }
  });
}

function specificModelSelect(){
  // Formatting URL
  var apiURL = 'http://www.nhtsa.gov/webapi/api/SafetyRatings';
  var year = $('#year-select').find(':selected').text();
  year = year !== '' ? year : '2015';
  var make = $('#make-select').find(':selected').text();
  make = make !== '' ? make : 'Acura';
  var model = $('#model-select').find(':selected').text();
  model = model !== '' ? model : 'ILX';
  var apiParam = '/modelyear/' + year + '/make/' + make + '/model/' + model + '/';
  var outputFormat = '?format=json';
  var callback = '?callback=myCallback'
  var requestURL = apiURL+apiParam+outputFormat+callback;

  // Sending Request
  $.ajax({
    url: requestURL,
    dataType: 'jsonp',
    success: function(data){
      $.each(data['Results'],function(){
        $.each(this, function(k,v){
          var vID = '';
          if(k == 'VehicleId'){
            vID = v;
          }
          else if(k == 'VehicleDescription'){
            var specificModelItem = '<option value='+vID+'>'+v+'</option>';
            $('#specific-model-select').append(specificModelItem);
          }
        });
      });
    }
  });
}