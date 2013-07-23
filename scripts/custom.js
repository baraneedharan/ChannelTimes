$( document ).one( "pageinit", function() {


	baseapiurl = "https://trivone.in/speedsell/";


	//Check wthr the user is already logged in 
	var email = localStorage.getItem("email");
	if(email == null) {
		console.log("hi");
		$.mobile.changePage( "#splash", { changeHash: true });
	}
	else {

		var keep_logged = localStorage.getItem("keep-logged");
		console.log(keep_logged);
		if(keep_logged == "false") {
			$.mobile.changePage( "#splash", { changeHash: true });
		}
		else {
			$.mobile.changePage( "#schemelist", { changeHash: true });
	        updateLeftpanel();
	    	updateRightpanel();
	    	updateProfile();
	    	firstupdateSchemelist();  
		}
	}





	$('form').submit(function() {
	  console.log('Handler for .submit() called.');
	  return false;
	});


	  //Bind the swipeleftHandler callback function to the swipe event on wrapper 
	  $('.ui-panel-content-wrap').live( 'swiperight', swiperightHandler );
	  $('.ui-panel-content-wrap').live( 'swipeleft', swipeleftHandler );

	  $('.profile-detail').live( 'swipeup', swipeUpHandler );

	  function swipeUpHandler() {
	  	$(".profile-detail").slideUp();
	  	$(".profile-icon").removeClass("active")
	  }
	 
	  // Callback function references the event target and adds the 'swipeleft' class to it
	  function swiperightHandler(event){
	    $("#leftpanel").panel("open");
	  }

	  // Callback function references the event target and adds the 'swipeRight' class to it
	 function swipeleftHandler(event){
	    $("#rightpanel").panel("open");
	  }


	$('.profile-icon').live("click", function() {
		$(this).addClass("active")
	  	$(".profile-detail").slideDown();
	  	//$(".scheme-types, .articles-types").slideUp();
	});

	$('.profile-icon.active').live("click", function() {
		$(this).removeClass("active")
	  	$(".profile-detail").stop().slideUp();
	  	//$(".scheme-types, .articles-types").stop().slideDown();
	});


	$("#leftpanel").live( "panelclose", function( event, ui ) {
		$('.profile-icon').removeClass("active")
	  	$(".profile-detail").slideUp();
	});

	$(".back-btn, .caps.ui-link").live("click", function(){
		$(".validity-tooltip").hide();
	});


	// This is the function wired into the click event of some link or button:
	$('#register-stepone').live("click", function() {
	    // First check whether the inputs are valid:
	    if (validateMyInputs()) {
	        $.mobile.changePage( "#register-login", { transition: "slide", changeHash: true });
	        
	    }
	});


	$('#register-btn').live("click", function() {
		if (validateregisterInputs()) {
			$.mobile.loading("show");
	       registeruser(); 
	    }
		
	});

	$('#login-btn').live("click", function() {
		if (validateloginInputs()) {
	       loginuser(); 
	    }
	});

	$('.forgot-pass-btn').live("click", function() {
		if (validateforgotpassInputs()) {
			$.mobile.loading("show");
		   email_id = $(".forgot-email").val();
	       forgotpassword(); 
	    }
	});

	

	//Further click events on the App

	$(".get-scheme-detail").live("click", function() {
		$.mobile.loading("show");
		scheme_id = $(this).find(".scheme-id").text();
		getschemeDetail();
	});

	$(".scheme-btn").live("click", function() {
		$.mobile.loading("show");
		scheme_id = $(".scheme-btn").parents().find(".scheme-detail-content .scheme-id").text();
		scheme_action = $(this).find(".hidden-value").text();
		getactionconfirm();
	});


	$(".scheme-from-brand").live("click", function() {
		$.mobile.loading("show");
		brand_id = $(".scheme-from-brand").parent().parent().find(".scheme-list-brandid").text();
		getschemelist_brand();
	});

	$(".get-scheme-list").live("click", function() {
		$.mobile.loading("show");
		updateSchemelist(); 
	});

	$("#leftpanel .scheme-types:first input[type='radio']").live("change", function() {
		$.mobile.loading("show");
		$(".schemelist-content").show();
		$(".news-articles-content").hide();
		selected_type = $(this).attr("leftid");
		selected_label = $(this).parent().find(".ui-btn-text").text();
		//alert(selected_type);
		getfilteredscheme();
	});

	
	$(".filter-types input[type='checkbox']").live("change", function() {
		$(this).parents(".ui-listview").find("input[type='checkbox']:first").attr("checked",false).checkboxradio().checkboxradio("refresh");
	});


	$(".filter-types li.ui-first-child input[type='checkbox']").live("change", function() {
		$(this).parents(".ui-listview").find("input[type='checkbox']").attr("checked",false).checkboxradio().checkboxradio("refresh");
		$(this).parents(".ui-listview").find("input[type='checkbox']:first").attr("checked",true).checkboxradio().checkboxradio("refresh");
	});

	//Right panel check if value is changed

	$("#rightpanel").on( "panelbeforeopen", function( event, ui ) {
	        selected_filter_old = new Array();
			selected_oem_old = new Array();
			$('.filter-types:first :checked').each(function() {
			    selected_filter_old.push($(this).attr('id'));
			});
			$('.filter-types:last :checked').each(function() {
			    selected_oem_old.push($(this).attr('id'));
			});
	});

	$("#rightpanel").on( "panelbeforeclose", function( event, ui ) {
	        selected_filter_new = new Array();
			selected_oem_new = new Array();
			$('.filter-types:first :checked').each(function() {
			    selected_filter_new.push($(this).attr('id'));
			});
			$('.filter-types:last :checked').each(function() {
			    selected_oem_new.push($(this).attr('id'));
			});
	});

	

	$("#rightpanel").live( "panelclose", function( event, ui ) {
		if($(selected_filter_old).not(selected_filter_new).length == 0 && $(selected_filter_new).not(selected_filter_old).length == 0) {
			//Do nothing
			if($(selected_oem_old).not(selected_oem_new).length == 0 && $(selected_oem_new).not(selected_oem_old).length == 0) {
				//Do nothing
			}
			else {
				$.mobile.loading("show");
				selected_filter = selected_filter_new;
				selected_oem = selected_oem_new;
				rightpanelfilter();
			}
		}
		else {
			$.mobile.loading("show");
			selected_filter = selected_filter_new;
			selected_oem = selected_oem_new;
			rightpanelfilter();
		}

	});
 

	$(".logout").live("click", function() {
		$.mobile.loading("show");
		logoutuser(); 
	});

	// Open link in browser

	$(".reference-link, .get-feed-detail").live("click", function(e) {
	    e.preventDefault();
	    var targetURL = $(this).attr("href");
	    window.open(targetURL, "_system");
	});

	//All functions


	function loginuser() {
		$.mobile.loading("show");
		var email = $(".login-email").val();
		var password = $(".login-password").val();
		$.ajax({
            type : "POST",
            url  : "https://trivone.in/speedsell/api/login.php",
            data :{email: email, password: password},
            dataType :"json",
        }).success(function(response) {
        	console.log(response);
            var response_status = response.loginresponse[0].status;
            var user_token = response.loginresponse[0].token;

            localStorage.setItem("email", email);
			localStorage.setItem("user_token", user_token);

			if($('input[name="check-log"]').is(":checked")){
				localStorage.setItem("keep-logged", "true");
			}else {
				localStorage.setItem("keep-logged", "false");
			}

            // email=user_token;
            // localStorage.email=email;

            if(response_status == 0) {
            	alert(response.loginresponse[0].message);
            	$.mobile.loading("hide");
            }
            else {
            	//First time login
            	$.mobile.loading("show");
            	updateLeftpanel();
            	updateRightpanel();
            	updateProfile();
            	firstupdateSchemelist();          	
            }
        });
	}


	function registeruser() {
		var name = $(".name").val();
		var organization = $(".organization").val();
		var mobile = $(".mobile").val();
		var city = $(".city").val();
		var tin = $(".tin").val();
		var email = $(".email").val();
		var password = $(".password").val();
		$.ajax({
            type : "POST",
            url  : baseapiurl+"api/register.php",
            data :{name: name, organization: organization, mobile: mobile , city: city, tin: tin, email: email, password: password},
            dataType :"json",
        }).success(function(response) {
        	//console.log(response);
            //console.log(response.registerresponse[0].status);
            var response_status = response.registerresponse[0].status;
            if(response_status == 0) {
            	alert(response.registerresponse[0].message);
            	$(".email").val("");
            	$(".password").val("");
            }
            else {
            	alert(response.registerresponse[0].message);
            	$.mobile.changePage( "#login", { transition: "slide", changeHash: true });
            	$.mobile.loading("hide");

            }
        });
	}

	function logoutuser() {
		//$.mobile.changePage('index.html', { reloadPage: true });
    	$.ajax({
            type : "GET",
            url  : baseapiurl+"api/logout.php",
            data :{email:localStorage["email"] , authtoken: localStorage["user_token"]},
            dataType :"json",
        }).success(function(response) {
        	console.log(response);
        	$.mobile.loading("hide");
        	if(response.logout[0].status == "1") {
        		alert(response.logout[0].message);
        		window.location = "index.html";
        	}
        	else {
        		alert("Please Login to continue");
        		window.location = "index.html";
        	}
        	localStorage.removeItem("email");
        	localStorage.removeItem("user_token");
        });
	}


	function forgotpassword() {
		//$.mobile.changePage('index.html', { reloadPage: true });
    	$.ajax({
            type : "POST",
            url  : baseapiurl+"api/forgot.php",
            data :{email: email_id},
            dataType :"json",
        }).success(function(response) {
        	console.log(response);
        	$.mobile.loading("hide");
        	if(response.forgotresponse[0].status == "1") {
        		console.log(response.forgotresponse[0].message);
        		alert("Password instruction email has been sent to your mail id. Please follow the same");
        		$.mobile.changePage( "#login", { transition: "slide", changeHash: true });
        	}
        	else if(response.forgotresponse[0].status == "0") {
        		console.log(response.forgotresponse[0].message);
        		alert(response.forgotresponse[0].message);
        	}
        });
	}


	function firstupdateSchemelist() {
		$("#schemelist .ui-title").text("All Schemes");
		$(".search-bar").show();
		$(".scheme-list").html("");
		$.mobile.changePage( "#schemelist", { transition: "slide", changeHash: true });
		$.mobile.loading("show");
    	$.ajax({
            type : "GET",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "schemes", email:localStorage["email"] , authtoken: localStorage["user_token"]},
            dataType :"json",
        }).success(function(response) {
        	//console.log(response);
        	var tpl = "";
        	var list = "";
        	$.each(response. Scheme,function(key, topics){
        		list = '<li><a href="JavaScript:void(0);" class="get-scheme-detail" data-transition="slide">'+
							'<span class="scheme-detail">'+
								'<h2 class="scheme-title">'+topics.title+'</h2>'+
								'<p>Brand: '+topics.brand+'</p>'+
								'<p>Products: '+topics.product+' </p>'+
								'<p class="scheme-id">'+topics.schemeID+'</p>'+
								'<p class="scheme-list-type">'+topics.schemetype+'</p>'+
							'</span>'+
							'<span class="scheme-type">'+
								'<h4>Validity</h4>'+
								'<p><span class="start-date">'+topics.validity.startdate+'</span> - <span class="end-date">'+topics.validity.enddate+'</span></p>'+
								'<span class="scheme-status '+topics.schemestatus+'-status">'+topics.schemestatus+'</span>'+
							'</span>'+
						'</a></li>';
        		tpl += list;
			});
			
			//console.log(tpl);
			$(".scheme-list").html("").append(tpl);
			// var win_height = $(window).height();
			// $("#rightpanel .ui-panel-inner").height(win_height);
			// $("#leftpanel .ui-panel-inner").height(win_height);
			$('.scheme-list').listview().listview('refresh');
			$.mobile.loading("hide");
        });
	}


	function updateSchemelist() {
		$("#schemelist .ui-title").text("All Schemes");
		$(".search-bar").show();		
		$(".scheme-list").html("");
    	$.ajax({
            type : "GET",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "schemes", email:localStorage["email"] , authtoken: localStorage["user_token"]},
            dataType :"json",
        }).success(function(response) {
        	//console.log(response);
        	var tpl = "";
        	var list = "";
        	$.each(response. Scheme,function(key, topics){
        		list = '<li><a href="JavaScript:void(0);" class="get-scheme-detail" data-transition="slide">'+
							'<span class="scheme-detail">'+
								'<h2 class="scheme-title">'+topics.title+'</h2>'+
								'<p>Brand: '+topics.brand+'</p>'+
								'<p>Products: '+topics.product+' </p>'+
								'<p class="scheme-id">'+topics.schemeID+'</p>'+
								'<p class="scheme-list-type">'+topics.schemetype+'</p>'+
							'</span>'+
							'<span class="scheme-type">'+
								'<h4>Validity</h4>'+
								'<p><span class="start-date">'+topics.validity.startdate+'</span> - <span class="end-date">'+topics.validity.enddate+'</span></p>'+
								'<span class="scheme-status '+topics.schemestatus+'-status">'+topics.schemestatus+'</span>'+
							'</span>'+
						'</a></li>';
        		tpl += list;
			});
			
			//console.log(tpl);
			$(".scheme-list").html("").append(tpl);
			$('.scheme-list').listview().listview('refresh');
			$.mobile.changePage( "#schemelist", { transition: "slide", changeHash: true });
			$.mobile.loading("hide");
        });
	}

	function updateLeftpanel(){
	    $.ajax({
            type : "POST",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "leftpanel", email:localStorage["email"] , authtoken: localStorage["user_token"]},
            dataType :"json",
        }).success(function(response) {
        	//console.log(response); 
        	var tpl = "";
        	$.each(response.leftPanel,function(key, topics){
        		var ul = "";
        		$.each(topics,function(topic,contents) {
        			var li = "";
        			$.each(contents,function(index,contentname){
        				var str = contentname;
						str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
						    return letter.toUpperCase();
						});
						idtopass = str.toLowerCase().replace(/ /g, '');
        				li += '<li><input type="radio" name="leftpanel-radio" leftid="'+idtopass+'" id="radio-'+contentname+'" feedId='+index+' value="on" /><label for="radio-'+contentname+'">'+str+'</label></li>';
        				//console.log(li);
        			});

        			ul += '<div class="scheme-types"><h1 class="panel-heading">'+topic.toUpperCase() +'</h1><ul>'+li+'</ul></div>';

        		});
        		tpl += ul;
			});   

			$("#leftpanel .ui-panel-inner .iscroll-content").append(tpl);

			//$('.scheme-types ul').listview().listview('refresh');
			$(".scheme-types input[type='radio']").checkboxradio().checkboxradio("refresh");
			$("#leftpanel").trigger( "updatelayout" );
        });
	}

	function updateRightpanel(){
	    $.ajax({
            type : "POST",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "rightpanel", email:localStorage["email"] , authtoken: localStorage["user_token"]},
            dataType :"json",
        }).success(function(response) {
        	//console.log(response); 
        	var tpl = "";
        	$.each(response.rightpanel,function(key, topics){
        		var ul = "";
        		$.each(topics,function(topic,contents) {
        			var li = "";
        			$.each(contents,function(index,contentname){
        				var str = contentname;
						str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
						    return letter.toUpperCase();
						});
        				li += '<li><input type="checkbox" name="rightpanel-checkbox" id="'+index+'" value="on" /><label for="'+index+'">'+str+'</label></li>';
        			});

        			ul += '<div class="filter-types"><h1 class="panel-heading">'+topic.toUpperCase() +'</h1><ul>'+li+'</ul></div>';

        		});
        		tpl += ul;
			});   

			//console.log("TPL :",tpl); 
			$("#rightpanel .ui-panel-inner .iscroll-content").append(tpl);

			$('.filter-types ul').listview().listview('refresh');
			$(".filter-types input[type='checkbox']").checkboxradio().checkboxradio("refresh"); 
			$(".filter-types li.ui-first-child").find("input[type='checkbox']").attr("checked",true).checkboxradio("refresh");  
			$("#rightpanel").trigger( "updatelayout" );
        });
	}

	function updateProfile(){
	    $.ajax({
            type : "POST",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "profile", email:localStorage["email"] , authtoken: localStorage["user_token"]},
            dataType :"json",
        }).success(function(response) { 
    		$(".profile .user-name").text(response.ProfilePanel[0].name);
    		$(".profile-listing .user-email").text(response.ProfilePanel[0].email);
    		$(".profile-listing .user-business").text(response.ProfilePanel[0].businessname);
    		$(".profile-listing .user-location").text(response.ProfilePanel[0].location);
    		$(".profile-listing .user-mobile").text(response.ProfilePanel[0].mobile);
        });
	}


	//Get the scheme Details

	function getschemeDetail() {
		$("#scheme-detail").find(".scheme-btn").removeClass("hidden");
		$(".accept-terms input[type='checkbox']").attr("checked",false).checkboxradio().checkboxradio("refresh");
		//console.log(scheme_id);
		$.ajax({
            type : "POST",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "scheme_detail", email:localStorage["email"] , authtoken: localStorage["user_token"], schemeID: scheme_id},
            dataType :"json",
        }).success(function(response) { 
        	//console.log(response);

        	slabtpl = "";
        	$.each(response.SchemeDetail[0].slab ,function(key, value){
	        	slabtpl += '<p><span class="slab-key">'+key+'</span> : '+value+'</p>';
	        	console.log(slabtpl);
			});

			key =  Object.keys(response.SchemeDetail[0].payout)[0];
			value = response.SchemeDetail[0].payout[key];

        	var tpl='<h6 class="scheme-title">'+response.SchemeDetail[0].title+'</h6>'+
					'<div class="scheme-scrollable-content">'+
						'<div class="scheme-brief-detail">'+
							'<p>Brand: <span class="scheme-brand">'+response.SchemeDetail[0].brand+'</span></p>'+
							'<p>Products:<span class="scheme-product">'+response.SchemeDetail[0].product+'</span> </p>'+
							'<p>Model: <span class="scheme-brand">'+response.SchemeDetail[0].model+'</span></p>'+
							'<p class="scheme-id">'+response.SchemeDetail[0].schemeID+'</p>'+
							'<p class="scheme-list-type">'+response.SchemeDetail[0].schemetype+'</p>'+
							'<p class="scheme-list-status">'+response.SchemeDetail[0].schemestatus+'</p>'+
							'<p class="scheme-list-brandid">'+response.SchemeDetail[0].brandID+'</p>'+
						'</div>'+
						'<div class="divider"></div>'+
						'<div class="clear"></div>'+
						'<h5 class="scheme-validity">'+
							'Validity: <span class="scheme-validity-startdate">'+response.SchemeDetail[0].validity.startdate+'</span><span> - </span><span class="scheme-validity-startdate">'+response.SchemeDetail[0].validity.enddate+'</span>'+
						'</h5>'+
						'<div class="right reference"><a href="www.google.com" class="reference-link">Visit Website</a></div>'+
						'<div class="clear"></div>'+
						'<div class="divider"></div>'+
						'<div class="payout">'+
							'<h3>PAYOUT</h3>'+
							'<p>'+key+' : '+value+'</p>'+
						'</div>'+
						'<div class="slab">'+
							'<h3>SLAB</h3>'+slabtpl+
						'</div>'+
						'<div class="clear"></div>'+
						'<div class="divider"></div>'+
						'<div class="more-scheme">'+
							'<a href="#" class="red-link scheme-from-brand">More Schemes from '+response.SchemeDetail[0].brand+'</a>'+
						'</div>'+
					'</div>';

			$(".scheme-detail-content").html("").append(tpl);

			if(response.SchemeDetail[0].terms == "Yes") {
				$("accept-terms").show();
				$(".scheme-btn").addClass("ui-disabled");
			} else {
				$("accept-terms").hide();
				$(".scheme-btn").removeClass("ui-disabled");
			}

        	$.mobile.changePage( "#scheme-detail", { transition: "slide", changeHash: true });
        	var scheme_status = response.SchemeDetail[0].schemestatus.toLowerCase().replace(/ /g, '');
        	$("#scheme-detail").find("."+scheme_status).addClass("hidden");
        	$.mobile.loading("hide");
        });
	}

	//Get the scheme Action Confirmation

	function getactionconfirm() {
		//console.log(scheme_id);
		$.ajax({
            type : "POST",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "scheme_action", email:localStorage["email"] , authtoken: localStorage["user_token"], schemeID: scheme_id, action: scheme_action},
            dataType :"json",
        }).success(function(response) { 
        	//console.log(response);
        	var tpl='<h1 class="confirmation-title">'+response.Confirmation[0].title+'</h1>'+
					'<div class="divider"></div>'+
					'<div class="confirmation-message">'+
					'<p>'+response.Confirmation[0].message+'</p>'+
					'</div>'+
					'<div class="divider"></div>'+
					'<div class="more-scheme">'+
					'<a href="javascript:void(0)" class="get-scheme-list red-link" data-transition="slide">View More Schemes</a>'+
					'</div>'+
					'<div class="divider"></div>';

			$(".confirmation-content").html("").append(tpl);
        	$.mobile.changePage( "#scheme-action", { transition: "slide", changeHash: true });
        	$.mobile.loading("hide");
        });
	}

	//Get the scheme list of specific Barand

	function getschemelist_brand() {
		$("#schemelist .ui-title").text("All Schemes");
		$(".search-bar").show();	
		$(".scheme-list").html("");
		$(".filter-types input[type='checkbox']").attr("checked",false).checkboxradio().checkboxradio("refresh");
		$("#"+brand_id).attr("checked",true).checkboxradio().checkboxradio("refresh");
    	$.ajax({
            type : "GET",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "scheme_brand", email:localStorage["email"] , authtoken: localStorage["user_token"],  brandid: brand_id},
            dataType :"json",
        }).success(function(response) {
        	//console.log(response);
        	var tpl = "";
        	var list = "";
        	$.each(response. Scheme,function(key, topics){
        		list = '<li><a href="JavaScript:void(0);" class="get-scheme-detail" data-transition="slide">'+
							'<span class="scheme-detail">'+
								'<h2 class="scheme-title">'+topics.title+'</h2>'+
								'<p>Brand: '+topics.brand+'</p>'+
								'<p>Products: '+topics.product+' </p>'+
								'<p class="scheme-id">'+topics.schemeID+'</p>'+
								'<p class="scheme-list-type">'+topics.schemetype+'</p>'+
							'</span>'+
							'<span class="scheme-type">'+
								'<h4>Validity</h4>'+
								'<p><span class="start-date">'+topics.validity.startdate+'</span> - <span class="end-date">'+topics.validity.enddate+'</span></p>'+
								'<span class="scheme-status '+topics.schemestatus+'-status">'+topics.schemestatus+'</span>'+
							'</span>'+
						'</a></li>';
        		tpl += list;
			});
			//console.log(tpl);
			$(".scheme-list").html("").append(tpl);
			$('.scheme-list').listview().listview('refresh');
			$.mobile.changePage( "#schemelist", { transition: "slide",changeHash: true });
			$.mobile.loading("hide");
        });
	}

	function getfilteredscheme() {
		//console.log(selected_type);
		$("#leftpanel").panel("close");
		$("#schemelist .ui-title").text(selected_label+" Schemes");
		$(".search-bar").show();
		$.ajax({
            type : "GET",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "schemes", email:localStorage["email"] , authtoken: localStorage["user_token"],  type: selected_type},
            dataType :"json",
        }).success(function(response) {
       		//console.log(response);
       		if(response.Scheme[0].status == 0) {
				$.mobile.loading("hide");
				alert(response.Scheme[0].message);
            } else {         	
	        	var tpl = "";
	        	var list = "";
	        	$.each(response. Scheme,function(key, topics){
	        		list = '<li><a href="JavaScript:void(0);" class="get-scheme-detail" data-transition="slide">'+
								'<span class="scheme-detail">'+
									'<h2 class="scheme-title">'+topics.title+'</h2>'+
									'<p>Brand: '+topics.brand+'</p>'+
									'<p>Products: '+topics.product+' </p>'+
									'<p class="scheme-id">'+topics.schemeID+'</p>'+
									'<p class="scheme-list-type">'+topics.schemetype+'</p>'+
								'</span>'+
								'<span class="scheme-type">'+
									'<h4>Validity</h4>'+
									'<p><span class="start-date">'+topics.validity.startdate+'</span> - <span class="end-date">'+topics.validity.enddate+'</span></p>'+
									'<span class="scheme-status '+topics.schemestatus+'-status">'+topics.schemestatus+'</span>'+
								'</span>'+
							'</a></li>';
	        		tpl += list;
				});
				//console.log(tpl);
				$(".scheme-list").html("").append(tpl);
				$('.scheme-list').listview().listview('refresh');
				$.mobile.loading("hide");
			}
        });
	}

	function rightpanelfilter() {
		//console.log(selected_filter);
		//console.log(selected_oem);
		$("#schemelist .ui-title").text("All Schemes");
		$(".search-bar").show();
		var data = {
            	event: "schemes", 
            	email:localStorage["email"] , 
            	authtoken: localStorage["user_token"]
            };

            if(selected_filter.length) {
            	data.date = selected_filter;
            }

            if(selected_oem.length) {
            	data.oem = selected_oem;
            }

		$.ajax({
            type : "GET",
            url  : baseapiurl+"api/scheme.php",
            data : data,
            dataType :"json",
        }).success(function(response) {
       		//console.log(response);
       		if(response.Scheme[0].status=="0"){
				alert(response.Scheme[0].message);
				$.mobile.loading("hide");
			}
			else {
	        	var tpl = "";
	        	var list = "";
	        	$.each(response. Scheme,function(key, topics){
	        		list = '<li><a href="JavaScript:void(0);" class="get-scheme-detail" data-transition="slide">'+
								'<span class="scheme-detail">'+
									'<h2 class="scheme-title">'+topics.title+'</h2>'+
									'<p>Brand: '+topics.brand+'</p>'+
									'<p>Products: '+topics.product+' </p>'+
									'<p class="scheme-id">'+topics.schemeID+'</p>'+
									'<p class="scheme-list-type">'+topics.schemetype+'</p>'+
								'</span>'+
								'<span class="scheme-type">'+
									'<h4>Validity</h4>'+
									'<p><span class="start-date">'+topics.validity.startdate+'</span> - <span class="end-date">'+topics.validity.enddate+'</span></p>'+
									'<span class="scheme-status '+topics.schemestatus+'-status">'+topics.schemestatus+'</span>'+
								'</span>'+
							'</a></li>';
	        		tpl += list;
				});
				//console.log(tpl);
				$(".scheme-list").html("").append(tpl);
				$('.scheme-list').listview().listview('refresh');
				$.mobile.loading("hide");
			}
        });
	}






	//Validations

	function validateMyInputs() {

	    // Start validation:
	    $.validity.start();

	    $(".name").require();
	    $(".organization").require();
	    $(".mobile").require().match("number");
	    $(".city").require();
	    $(".tin").require();
	    
	    // All of the validator methods have been called:
	    // End the validation session:
	    var result = $.validity.end();
	    
	    // Return whether it's okay to proceed with the Ajax:
	    return result.valid;
	}

	function validateregisterInputs() {

	    // Start validation:
	    $.validity.start();

	    $(".email").require().match("email");
	    $(".password").require();
	    
	    var result = $.validity.end();
	    
	    // Return whether it's okay to proceed with the Ajax:
	    return result.valid;
	}

	function validateloginInputs() {

	    // Start validation:
	    $.validity.start();

	    $(".login-email").require().match("email");
	    $(".login-password").require();

	    var result = $.validity.end();
	    
	    // Return whether it's okay to proceed with the Ajax:
	    return result.valid;
	}

	function validateforgotpassInputs() {
		// Start validation:
	    $.validity.start();

	    $(".forgot-email").require().match("email");

	    var result = $.validity.end();
	    
	    // Return whether it's okay to proceed with the Ajax:
	    return result.valid;
	}


	//Prevent swipe on scroll


	$(document).on('touchmove', 'body', function(event) {
		$(document).on('swipeleft swiperight',function(event, data){
		        event.stopImmediatePropagation();
		        event.preventDefault(); 
		        //alert('(document).Stop prop: You just ' + event.type + 'ed!');
		 });
	});



	//Search scheme 

	var frm = $('#search-scheme');
    frm.submit(function () {
    $.mobile.loading("show");
    var search_text = $("#search-scheme input[type=text]").val()
	$.ajax({
            type : "GET",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "search", email:localStorage["email"] , authtoken: localStorage["user_token"], text: search_text},
            dataType :"json",
        }).success(function(response) {
        	console.log(response);
        	if(response.Scheme[0].status=="0"){
				alert(response.Scheme[0].message);
				$.mobile.loading("hide");
			}
			else {
				var tpl = "";
	        	var list = "";
	        	$.each(response. Scheme,function(key, topics){
	        		list = '<li><a href="JavaScript:void(0);" class="get-scheme-detail" data-transition="slide">'+
								'<span class="scheme-detail">'+
									'<h2 class="scheme-title">'+topics.title+'</h2>'+
									'<p>Brand: '+topics.brand+'</p>'+
									'<p>Products: '+topics.product+' </p>'+
									'<p class="scheme-id">'+topics.schemeID+'</p>'+
									'<p class="scheme-list-type">'+topics.schemetype+'</p>'+
								'</span>'+
								'<span class="scheme-type">'+
									'<h4>Validity</h4>'+
									'<p><span class="start-date">'+topics.validity.startdate+'</span> - <span class="end-date">'+topics.validity.enddate+'</span></p>'+
									'<span class="scheme-status '+topics.schemestatus+'-status">'+topics.schemestatus+'</span>'+
								'</span>'+
							'</a></li>';
	        		tpl += list;
				});
				//console.log(tpl);
				$(".scheme-list").html("").append(tpl);
				$('.scheme-list').listview().listview('refresh');
				$.mobile.loading("hide");
			}
        	
        });
    	console.log("search triggered");
        return false;
    });


	//Pull Doen refresh 


	//Pull Doen refresh 


      function onPullDown (event, data) { 
	    setTimeout(function fakeRetrieveDataTimeout() { 
	      gotPullDownData(event, data); 
	      console.log("hi");
	  }, 1500); }  

	  function gotPullDownData(event, data) {
	  	// Prepend new content and refresh listview
	  	console.log("get pulled down called");
	  	selected_filter = new Array();
		selected_oem = new Array();
		$('.filter-types:first :checked').each(function() {
		    selected_filter.push($(this).attr('id'));
		});
		$('.filter-types:last :checked').each(function() {
		    selected_oem.push($(this).attr('id'));
		});
	  	rightpanelfilter();
	    data.iscrollview.refresh();    // Refresh the iscrollview
	   }

	   $(".iscroll-wrapper").live( {
	      	iscroll_onpulldown : onPullDown
	   });
	    



	// FEEDS LISTING

	$("#leftpanel .scheme-types:last input[type='radio']").live("change", function() {
		$("#schemelist .ui-title").text("News & Articles");
		$(".schemelist-content").hide();
		$(".news-articles-content").show();
		$("#leftpanel").panel("close");
		selected_feedtype = $(this).attr("feedId");
		updatefeedlist();
	});


	function updatefeedlist() {
		$.mobile.loading("show");
		$.ajax({
            type : "GET",
            url  : baseapiurl+"api/articles.php",
            data :{email:localStorage["email"] , authtoken: localStorage["user_token"],  article: selected_feedtype},
            dataType :"xml",
        }).success(function(xml) {
       		//console.log(xml);
       		var tpl = "";
        	var list = "";
       		$(xml).find("item").each(function(key, value){
			    var title = $(value).find("title").text();
			    var date = $(value).find("pubDate").text();
			    var desc = $(value).find("description").text();
			    var link = $(value).find("feedburner\\:origLink, origLink").text();
			    console.log(link);
			    list = '<li><a href="'+link+'" class="get-feed-detail">'+
								'<h2 class="scheme-title">'+title+'</h2>'+
								'<p class="pub-date">'+date+'</p>'+
								'<p class="desc">'+desc+' </p>'+
						'</a></li>';
        		tpl += list;
		    });
		    $(".news-articles-content .article-list").html("").append(tpl);
			$('.news-articles-content .article-list').listview().listview('refresh');
			$.mobile.loading("hide");
        });
	}



	//Scheme Details Accept Terms

	$("#scheme-detail .accept-terms input[type='checkbox']").live("change", function() {
		console.log("hi");
		if (!$(this).is(':checked')) {
            console.log("checked");
            $(".scheme-btn").addClass("ui-disabled");
        }
        else {
        	 console.log("unchecked");
        	 $(".scheme-btn").removeClass("ui-disabled");
        }
	});


	//Terms page click


	$(".accept-terms-link").live("click", function() {
		$.mobile.loading("show");
		scheme_id = $("#scheme-detail").find(".scheme-id").text();
		updateterms();
	});

	function updateterms() {
    	$.ajax({
            type : "GET",
            url  : baseapiurl+"api/scheme.php",
            data :{event: "scheme_terms", email:localStorage["email"] , authtoken: localStorage["user_token"],  schemeID: scheme_id},
            dataType :"json",
        }).success(function(response) {
        	console.log(response.SchemeTerms[0].terms);
        	$(".terms-content").html(response.SchemeTerms[0].terms);
			$.mobile.changePage( "#terms-page", { transition: "slide",changeHash: true });
			$.mobile.loading("hide");
        });

	}


});