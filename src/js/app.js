App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  orderRawMaterialsFlag: 1,
  orderDairyProductsFlag: 1,
  feedbackflag: 1,
  called: false,

  init: async function() {
    console.log("Entered init function");
    // Load pets.
    $.ajaxSetup({async: false});
    return await App.initWeb3();
  },

  initWeb3: async function() {
    console.log("Entered initWeb3 function");
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    console.log("Entered initContract function");
    $.getJSON("addProducts.json", function(addProducts) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.addProducts = TruffleContract(addProducts);
      // Connect provider to interact with contract
      App.contracts.addProducts.setProvider(App.web3Provider);
    });

    $.getJSON("addRawMaterials.json", function(addRawMaterials){
        App.contracts.addRawMaterials = TruffleContract(addRawMaterials);
        App.contracts.addRawMaterials.setProvider(App.web3Provider);
    });

    $.getJSON("orderRawMaterials.json" , function(orderRawMaterials){
      App.contracts.orderRawMaterials = TruffleContract(orderRawMaterials);
      App.contracts.orderRawMaterials.setProvider(App.web3Provider);
    });

    $.getJSON("Warehouse.json", function(Warehouse){
      App.contracts.Warehouse = TruffleContract(Warehouse);
      App.contracts.Warehouse.setProvider(App.web3Provider);
    });

    $.getJSON("Login.json", function(Login){
      App.contracts.Login = TruffleContract(Login);
      App.contracts.Login.setProvider(App.web3Provider);
    });

    $.getJSON("Register.json", function(Register){
      App.contracts.Register = TruffleContract(Register);
      App.contracts.Register.setProvider(App.web3Provider);
    });

    $.getJSON("orderDairyProducts.json", function(orderDairyProducts){
      App.contracts.orderDairyProducts = TruffleContract(orderDairyProducts);
      App.contracts.orderDairyProducts.setProvider(App.web3Provider);
    });

    $.getJSON("FeedbackFarmer.json", function(FeedbackFarmer){
      App.contracts.FeedbackFarmer = TruffleContract(FeedbackFarmer);
      App.contracts.FeedbackFarmer.setProvider(App.web3Provider);
    });

    $.getJSON("FeedbackProducer.json", function(FeedbackProducer){
      App.contracts.FeedbackProducer = TruffleContract(FeedbackProducer);
      App.contracts.FeedbackProducer.setProvider(App.web3Provider);
    });
    App.called = true;
    console.log("called: inside init contract"+ App.called);
    //console.log("Reached end of initContract");
    //console.log(App.contracts); 
    return App.render(); 
  },

  render: function(){
    console.log("Entered render function");
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
      }
    });

    //console.log("End render function");
    //return App.giveInst();
  },
  //giving instances to the ffedback contracts
  giveInst: function(){
    console.log("entered givinst" + "feedback:"+App.feedbackflag+ typeof(App.feedbackflag));
    if(App.feedbackflag == 1){
      var orderRawMaterialsInstance;
        App.contracts.orderRawMaterials.deployed().then(function(instance){
          orderRawMaterialsInstance = instance;
          App.contracts.FeedbackFarmer.deployed().then(function(instance){
            console.log("giving instance");
            instance.giveInstance(orderRawMaterialsInstance.contract.address);
            App.feedbackflag = 0;
          });
        });
      var orderDairyProductsInstance;
      App.contracts.orderDairyProducts.deployed().then(function(instance){
        orderDairyProductsInstance =instance;
        App.contracts.FeedbackProducer.deployed().then(function(instance){
          instance.giveInstance(orderDairyProductsInstance.contract.address);
        });
      });
      App.feedbackflag = 0;
    }
  },
  // adding dairy products
  addP: function() {
    console.log("Entered function");
    var addProductsInstance;
    console.log($("#productSelect").val() +":" + $("#ap_fat").val() +":" + $("#ap_calories").val() +":" + $("#ap_protien").val() +":" + $("#ap_carb").val() +":" + $("#ap_price").val() +":" + $("#ap_quantity").val());
    App.contracts.addProducts.deployed().then(function(instance){
      addProductsInstance = instance;
      addProductsInstance.addProduct($("#productSelect").val(), $("#ap_fat").val(), $("#ap_calories").val(), $("#ap_protien").val(), $("#ap_carb").val(), $("#ap_price").val(), $("#ap_quantity").val()).then(function(res){
        alert("Product added successfully!");
        window.location.href = "index.html";
      });
    }).catch(function(err){
      console.log(err);
    });

    if(App.orderDairyProductsFlag == 1){
      console.log("inside flag block");
      App.contracts.orderDairyProducts.deployed().then(function(instance){
        orderDairyProductsInstance = instance;
        console.log(addProductsInstance.contract.address);
        orderDairyProductsInstance.giveInstance(addProductsInstance.contract.address);
      }).catch(function(err){
        console.log(err);
      });
      App.orderDairyProductsFlag =0 ;
    }
    console.log("reached end of addRaw");
  },
  //adding raw materials
  addRaw: function(){
    console.log("Entered addRaw");
    var addRawMaterialsInstance;
    //console.log($("#rawSelect").val()  + ":" + typeof(Number($("#fat").val()))  + ":" +typeof($("#calories").val())  + ":" +$("#protien").val() + ":" +$("#carb").val()  + ":" +$("#price").val()  + ":" +$("#quantity").val());
    
    if((40<=Number($("#carb").val()) && Number($("#carb").val())<=60) && (30<=Number($("#protien").val()) && Number($("#protien").val())<=40) && 
      (30<=Number($("#fat").val()) && Number($("#fat").val())<=50) && (500<=Number($("#calories").val()) && Number($("#calories").val())<=700)){
      App.contracts.addRawMaterials.deployed().then(function(instance){
        addRawMaterialsInstance = instance;
        console.log(instance.contract.address);
        addRawMaterialsInstance.addEntry($("#rawSelect").val() ,$("#fat").val() ,$("#calories").val() ,$("#protien").val() ,$("#carb").val() ,$("#price").val() ,$("#quantity").val()).then(function(res){
          alert("Product added successfully!");
          window.location.href = "index.html";
        });
      }).catch(function(err){
        console.log( "error" + err);
      });
    }else{
      alert("The product is adultrated and hence won't be added!");
    }

    if(App.orderRawMaterialsFlag == 1){
      console.log("inside flag block");
      App.contracts.orderRawMaterials.deployed().then(function(instance){
        orderRawMaterialsInstance = instance;
        console.log(addRawMaterialsInstance.contract.address);
        orderRawMaterialsInstance.giveInstance(addRawMaterialsInstance.contract.address);
      }).catch(function(err){
        console.log(err);
      });
      App.orderRawMaterialsFlag =0 ;
    }
    console.log("reached end of addRaw");
  },
  // creating a warehouse
  addWarehouse: function(){
    console.log("entered addWarehouse function");
    var WarehouseInstance;
    App.contracts.Warehouse.deployed().then(function(instance){
      WarehouseInstance = instance;
      WarehouseInstance.createWarehouse($("#location").val(), $("#space").val()).then(function(res){
        WarehouseInstance.warehouseCount().then(function(count){
          console.log(count);
          alert("Reciept:"+"\n"+"WarehouseId: "+ count + "\n" + "Location: "+ $("#location").val() + "\n" + "Space(in acres): "+ $("#space").val());
          window.location.href = "index.html";
        });
      });
      
      
    }).catch(function(err){
      console.log(err);
    });
  },
  //adding products to warehouse
  addToWarehouse: function(){
    console.log("entered addToWarehouse");
    var WarehouseInstance;
    App.contracts.Warehouse.deployed().then(function(instance){
      WarehouseInstance = instance;
      WarehouseInstance.warehouseCount().then(function(count){
        if(Number($("#warehouseId").val())<= count){
          console.log($("#warehouseId").val()+":"+$("#w_name").val()+":"+$("#w_quantity").val()+":"+ $("#w_quality").val());
          WarehouseInstance.add($("#warehouseId").val(),$("#w_name").val(),$("#w_quantity").val(), $("#w_quality").val()).then(function(res){
            console.log(res);
            alert("Transaction Successful!");
            window.location.href = "index.html";
          });
        }else{
          alert("No such warehouse exists!");
        }
      });
    });
  },
  //registering a new user
  addNew:  function() {
    console.log("Entered addNew");
    //console.log(App.contracts.Register);
    App.contracts.Register.deployed().then(function(instance){
     console.log(instance);
     instance.register($("#username").val(),$("#psw").val(),$("#email").val(),$("#userType").val()).then(function(res){
      console.log(res);
        alert("Account: "+ App.account);
        $("#logout").show();
        $("#signUp").hide();
        $("#login").hide();
        window.location.href = "index.html";
     }).catch(function(err){
      alert(App.account + " is already registered under a different username");
     });
    }).catch(function(err){
        console.log(err);
    });
  },
  //logging the user in
  addLogin:  function() {
    console.log("Entered addLogin");
    console.log(App.contracts.Login);
    App.contracts.Login.deployed().then(function(instance){
       var  FirstInstance = instance;
    return FirstInstance.setLogin($("#id1").val(),$("#id2").val());
    }).catch(function(err){
        console.log(err);
    });
    App.contracts.Login.deployed().then(function(instance){
        var  FirstInstance = instance;
        var instructorEvent =  FirstInstance.Instructor();
        instructorEvent.watch(function(error, result){
            if (!error){
              document.getElementById("result").style.visibility = "visible";
              if(result.args.val==1)           
                document.getElementById("result").innerHTML = " Please Register First before Login ";
              else if(result.args.val==3)           
                document.getElementById("result").innerHTML = " Please Enter Correct Username or Password. ";
              else if(result.args.val==2){
                document.getElementById("loginform").style.visibility = "hidden";
    
                document.getElementById("result").innerHTML = " Login Successfull <a href=''>Go to Home </a> ";
              }
              else{
                document.getElementById("loginform").style.visibility = "hidden";
                document.getElementById("result").innerHTML = result.args.val;  
              }
            }else{    
              console.log(error);
            }
      });
    });
      
  },

  //listing of all raw materials from the db happens here
  initOrderProducts: async function(){
    console.log("enetered initOrderProducts");
    
    var addRawMaterialsInstance;
    App.contracts.addRawMaterials.deployed().then(function(instance){
      addRawMaterialsInstance = instance;
      addRawMaterialsInstance.getItemsCount().then(function(count){
        //console.log(" xitemscount : " + count);
        $("#petsRow").empty();
        for (i = 1; i <= count ; i ++) {
          addRawMaterialsInstance.itemList(i).then(function(res){
            //console.log("struct : " + res);
            var name = res[2];
            var quantity = res[8];
            var price = res[7];
            //console.log(name + " " + price + " " + quantity);
            var x = "<div class = \"block\" id = \"template\"><div class = \"blue\" id = \"t_name\"><b>"+name+"</b></div><img class=\"card-img-top\" src=\"milk.jpg\" alt=\"Card image cap\"><div class = \"inside\"><p id = \"q\">Quantity Available :"+quantity+"</p><p id = \"r\">Rate/Litre : "+price+"</p>"+
      "<button id = \"order\" class = \"btn btn-primary\" data-id = "+res[1]+" data-amount = "+price+" data-name = "+name+">Order</button></div></div>";

            $("#petsRow").append(x);
          });
        }
      });
    }).catch(function(err){
      console.log(err);
    });    
    return  App.bindEvents();
  },
  //called from initOrderProducts
  bindEvents: function(){
    $(document).on('click','#order', App.handleOrder);
  },
  //called whenever the user clicks on the order button(raw materials)
  handleOrder: function(event){
    event.preventDefault();
    itemId = parseInt($(event.target).data('id'));
    rate = parseInt($(event.target).data('amount'));
    name = ($(event.target).data('name'));
    console.log(name);
    var queryString = "?itemId=" + itemId +  "&rate=" + rate + "&name=" + name;
    window.location.href = "orderRaw.html" + queryString;
    console.log("page changed");
    console.log(document.URL);
  },
  //ordering raw materials
  orderRaw: function(){
    console.log("Entered orderRaw");

    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    var id;
    var a = queries[0].split("=");
    id = Number(a[1]);
    var b = queries[1].split("=");
    rate = Number(b[1]);
    var c = queries[2].split("=");
    name = c[1];
    console.log(id + "id"+rate+"raate");
    //for (var i = 0; i < queries.length; i++){
      //var a = queries[i].split("=");
      //id = Number(a[1]);
      //console.log(a[1]+ typeof(a[1]));
      //console.log(queries[i] );
    //}

    var orderRawMaterialsInstance;
    App.contracts.orderRawMaterials.deployed().then(function(instance){
      console.log("instance : " + instance);
      orderRawMaterialsInstance = instance;
      orderRawMaterialsInstance.createOrder(id, $("#or_quantity").val()).then(function(res){
        var query = "?itemId=" + id +  "&q_ordered=" + $("#or_quantity").val();
        self.location ="reciept.html" + query ;
        alert("ORDER SUCCESSFUL: Bill: " + rate*$("#or_quantity").val());
      });  
    }).catch(function(err){
      console.log(err);
    });
  },
  //loading the contents of the reciept(raw materials) 
  loadDetails: function(){
    console.log("entered loadDetails");
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    var id;
    var reciever;
    var a = queries[0].split("=");
    id = Number(a[1]);
    var b = queries[1].split("=");
    q_ordered = Number(b[1]);
    console.log("itemid: "+ id);
    console.log("called:"+ App.called);
    if(App.called == true){
      App.contracts.addRawMaterials.deployed().then(function(instance){
        console.log(instance);
        instance.itemList(id).then(function(res){
          console.log(res[0] + typeof(res[0]));
          document.getElementById("r_name").innerHTML=res[2];
          document.getElementById("r_fat").innerHTML=res[3];
          document.getElementById("r_protien").innerHTML=res[5];
          document.getElementById("r_carb").innerHTML=res[6];
          document.getElementById("r_calories").innerHTML=res[4];
          document.getElementById("r_price").innerHTML=res[7];
          document.getElementById("r_quantity").innerHTML=q_ordered;
          document.getElementById("r_bill").innerHTML=q_ordered*res[7];
          document.getElementById("r_wallet").innerHTML=App.account;
          reciever = res[0];
        });
      }).catch(function(err){
        console.log(err);
      });
    }
    console.log(typeof(App.account));
    console.log(reciever , typeof(reciever));
    $(document).on('click','#pay', function(){
        console.log("initiating transaction");
        web3.eth.sendTransaction(
            {from:App.account,
            to:reciever,
            value:  "1000000000000000000", 
            }, function(err, transactionHash) {
          //if (!err)
            alert(transactionHash + " success"); 
        });
        window.location.href = "index.html";
    });
  },
  //loading the contents of the reciept(dairy products)
  loadDetailsDairy: function(){
    console.log("entered loadDetailsdairy");
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    var id;
    var reciever;
    var a = queries[0].split("=");
    id = Number(a[1]);
    var b = queries[1].split("=");
    q_ordered = Number(b[1]);
    console.log("itemid: "+ id);
    console.log("called:"+ App.called);
    if(App.called == true){
      App.contracts.addProducts.deployed().then(function(instance){
        console.log(instance);
        instance.ProductList(id).then(function(res){
          console.log(res[0] + typeof(res[0]));
          document.getElementById("rd_name").innerHTML=res[2];
          document.getElementById("rd_fat").innerHTML=res[3];
          document.getElementById("rd_protien").innerHTML=res[5];
          document.getElementById("rd_carb").innerHTML=res[6];
          document.getElementById("rd_calories").innerHTML=res[4];
          document.getElementById("rd_price").innerHTML=res[7];
          document.getElementById("rd_quantity").innerHTML=q_ordered;
          document.getElementById("rd_bill").innerHTML=q_ordered*res[7];
          document.getElementById("rd_wallet").innerHTML=App.account;
          reciever = res[0];
        });
      }).catch(function(err){
        console.log(err);
      });
    }
    console.log(typeof(App.account));
    console.log(reciever , typeof(reciever));
    $(document).on('click','#paydairy', function(){
        console.log("initiating transaction");
        web3.eth.sendTransaction(
            {from:App.account,
            to:reciever,
            value:  "1000000000000000000", 
            }, function(err, transactionHash) {
          if (!err)
            alert(transactionHash + " success"); 
            window.location.href = "index.html";
        });
    });
   
  },

  initOrderDairy: function(){
    console.log("enetered initOrderDairy");
    
    var addProductsInstance;
    App.contracts.addProducts.deployed().then(function(instance){
      addProductsInstance = instance;
      addProductsInstance.getProductsCount().then(function(count){
        console.log(" Productscount : " + count);
        $("#listProducts").empty();
        for (i = 1; i <= count ; i ++) {
          addProductsInstance.ProductList(i).then(function(res){
            //console.log("struct : " + res);
            var name = res[2];
            var quantity = res[8];
            var price = res[7];
            console.log(name + " " + price + " " + quantity);
            var x = "<div class = \"block\" id = \"template\"><div class = \"blue\" id = \"t_name\"><b>"+name+"</b></div><img class=\"card-img-top\" src=\"dairy.jpg\" alt=\"Card image cap\"><div class = \"inside\"><p id = \"q\">Quantity Available :"+quantity+"</p><p id = \"r\">Rate/Litre : "+price+"</p>"+
      "<button id = \"order\" class = \"btn btn-primary\" data-id = "+res[1]+" data-amount = "+price+">Order</button></div></div>";

            $("#listProducts").append(x);
          });
        }
      });
    }).catch(function(err){
      console.log(err);
    });
    return App.bindDairyEvents(); 
  },

  bindDairyEvents: function(){
    $(document).on('click','#order', App.handleDairyOrder);
  },

  handleDairyOrder: function(){
    event.preventDefault();
    itemId = parseInt($(event.target).data('id'));
    rate = parseInt($(event.target).data('amount'));
    var queryString = "?itemId=" + itemId +  "&rate=" + rate;
    window.location.href = "orderDairy.html" + queryString;
    console.log("page changed");
    console.log(document.URL);
  },

  orderDairy: function(){
    console.log("Entered orderdairy");

    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    var id;
    var a = queries[0].split("=");
    id = Number(a[1]);
    var b = queries[1].split("=");
    rate = Number(b[1]);

    var orderDairyProductsInstance;
    App.contracts.orderDairyProducts.deployed().then(function(instance){
      console.log("instance : " + instance);
      orderDairyProductsInstance = instance;
      orderDairyProductsInstance.createOrder(id, $("#op_quantity").val()).then(function(res){
        var query = "?itemId=" + id +  "&q_ordered=" + $("#op_quantity").val();
        self.location ="recieptdairy.html" + query ;
        alert("ORDER SUCCESSFUL: Bill: " + rate*$("#op_quantity").val());
      });
      
    });
  },

  givefeedback: function(){
    console.log("Entered feedback");
    var orderType = $('input[name=orderType]:checked').val();
    console.log(orderType + typeof(orderType));

    if(orderType == "dairy"){
      App.contracts.FeedbackProducer.deployed().then(function(instance){
        console.log($("#orderId").val()+ $("#feedback").val());
        instance.giveFeedback($("#orderId").val(), $("#feedback").val()).then(function(res){
          alert("Feedback recorded!");
          window.location.href = "index.html";
        });
      });
    }
    if(orderType == "milk"){
      App.contracts.FeedbackFarmer.deployed().then(function(instance){
        console.log($("#orderId").val()+ $("#feedback").val());
        console.log(instance);
        console.log("recording feedback");
        instance.giveFeedback($("#orderId").val(), $("#feedback").val()).then(function(res){
          alert("Feedback recorded!");
          window.location.href = "index.html";
        });
      }).catch(function(err){
        console.log(err);
      });
    }
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
