$( document ).ready(function() {
  yearSelect();
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

function sendRequestToApi(requestURL, param, callback){
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
          }
        });
      });
      callback(listItems);
    }
  });
}

function yearSelect(){
  var param = 'ModelYear';
  var requestURL = formatRequestToAPI(param);
  sendRequestToApi(requestURL, param, function(dropdownItems){
      $.each(dropdownItems, function(index,value){
        $('#year-select').append(value);
      });
    });
}

function makeSelect(){
  var param = 'Make';
  var requestURL = formatRequestToAPI(param);
  sendRequestToApi(requestURL, param, function(dropdownItems){
      $.each(dropdownItems, function(index,value){
        $('#make-select').append(value);
      });
    });
}

function modelSelect(){
  var param = 'Model';
  var requestURL = formatRequestToAPI(param);
  sendRequestToApi(requestURL, param, function(dropdownItems){
      $.each(dropdownItems, function(index,value){
        $('#model-select').append(value);
      });
    });
}

function specificModelSelect(){
  var param = 'VehicleDescription';
  var requestURL = formatRequestToAPI(param);
  sendRequestToApi(requestURL, param, function(dropdownItems){
      $.each(dropdownItems, function(index,value){
        $('#specific-model-select').append(value);
      });
    });
}