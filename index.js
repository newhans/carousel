var items = document.getElementsByClassName('item')
var list = document.getElementsByClassName('list')[0]
var container = document.getElementsByClassName('container')[0]


var pointWrap = document.getElementsByClassName('point')[0]
var points = []
var _creatPoint = function(i){
    var pointDom = document.createElement('li')
    pointDom.classList.add('point-item')
    if(i===0){
        pointDom.classList.add('active')
    }
    points.push(pointDom)
    pointWrap.appendChild(pointDom)
}




for(var i = 0;i<items.length ;i++){
    items[i].style.width = window.innerWidth + 'px'
    _creatPoint(i)
}


list.style.width = items.length * window.innerWidth + 'px'




var state ={
    beginX:0,
    endX:0,
    nowX:0,
    index:0


}

var _setIndex = function(){
    var index = state.index
    for(var i = 0;i < points.length;i++){
        points[i].classList.remove('active')
    }
    points[index].classList.add('active')


}

var _slice=function(){
    var deltaX = state.nowX - state.beginX
    list.style.marginLeft = -(window.innerWidth * state.index) + deltaX + 'px'


}






var _reset =function(){
    list.style.transition = 'all.3s'

    list.style.marginLeft = ( - state.index * window.innerWidth) + 'px'
    

}



var _goPrev = function(){
    if(state.index > 0){
        state.index --
        list.style.transition = 'all.3s'
        list.style.marginLeft = - state.index * window.innerWidth + 'px'
        _setIndex()
    }else{
        _reset()

    }
}


var _goNext = function(){
    if(state.index< items.length -1){
        state.index ++
        list.style.transition = 'all.3s'
        list.style.marginLeft = - state.index * window.innerWidth + 'px'

        _setIndex()
    }else{
        _reset()

    }
}



var _judgeMove = function(){
    var deltaX = state.endX - state.beginX 
    if( deltaX >= window.innerWidth  / 10){
        console.log('LAST')
        _goPrev()

    }else if(deltaX <= - window.innerWidth / 10){
        console.log('NEXT')
        _goNext()

    }else{
        console.log( 'This one')
        _reset()

    }
    
   
}



container.addEventListener('touchstart',function(e){
    list.style.transition = 'none'
    state.beginX=e.targetTouches[0].clientX


})

container.addEventListener('touchmove',function(e){
    var nowX= e.changedTouches[0].clientX
    state.nowX = nowX

    _slice()




    
})

container.addEventListener('touchend',function(e){
   state.endX = e.changedTouches[0].clientX
    _judgeMove()

    
})