import * as actions from "actions/itemDetail";

function detailGet(id) {
}
const store = {
  dispatch:function(id){
    console.log('running')
  	return id
	}
}
/**
 *
 * @type {{dispatch: *, getStore: *}} store
 *  next: 上一个middleware的处理方法，若无上一个middleware，参数为store的dispatch方法
 *  action: 最终的action
 */
const  loggerMidware =  ({dispatch,getStore}) => next => action => {
      console.log('strat')
      let result = next(action);
      console.log('end')
      return result
  }

function applyMiddleware(store, middlewares) { //简单版
  middlewares = middlewares.slice()
  middlewares.reverse() // 反转
	let dispatch = store.dispatch

  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)// 在每一个 middleware 中变换 dispatch 方法，
                                          // 第一个（最后一个）middleware为store中的dispatch
                                          // 第二个（最后一个第二个）为上一个middleware的返回结果
  )

  //Middleware 接收了一个 next() 的 dispatch 函数,并返回一个 dispatch 函数，
  // 返回的函数会被作为下一个 middleware 的 next()
  // 以此类推。由于 store 中类似 getState() 的方法依旧非常有用，我们将 store 作为顶层的参数，使得它可以在所有 middleware 中被使用。

  return Object.assign({}, store, { dispatch })
}

applyMiddleware(store, [loggerMidware])
  .dispatch(detailGet(123))


/**
 * applyMiddleareware源码
 * @param middlewares
 * @returns {function(*): function(...[*]): {[p: string]: *}}
 */
export default function applyMiddleware(...middlewares) { //源码
  return createStore => (...args) => { //接收第二个参数createStore，第三个参数reducers
    const store = createStore(...args)  // 利用传入的createStore和reducer和创建一个store
    let dispatch = () => {
      throw new Error(
      )
    }
    const middlewareAPI = {
      getState: store.getState, //注入 getStore方法
      dispatch: (...args) => dispatch(...args) //初始化dispatch
    }
    // 让每个 middleware 带着 middlewareAPI 这个参数分别执行一遍，进行初始化,
    // 得到的函数链为每个中间件的第一个返回值，该函数可接收一个dispatch，执行自己的任务后再将dispatch返回
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 使用compose从右到左聚合上述函数链（除最后一个函数外，每个函数可以接收一个dispatch，执行完自己的操作后再返回dispatch）
    // ，最底层的dispatch为store.dispatch,进行一层一层的封装，最终得到一个层层封装后的dispatch
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
//在第一次调用createStore的时候，
//　createStore先判断是否有middlewares（enhancer）的加入，如果有，就不执行createStore后面的操作，return出去执行enhancer()

//_dispatch = compose.apply(undefined, chain)，使用了一个compose函数，调用之后就可以将所有中间件串联起来，那么compose又是如何实现的呢？
function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}
//个人认为这个compose函数是整个redux中非常亮眼的部分，短短几行代码，就完成了一个核心功能的扩展，是责任链设计模式的经典体现。
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
      getState = _ref.getState;
    return function (next) {
      //最终的dispatch
      //next就是接收的store.dispatch参数,为上一个中间件改造过的dispatch
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
//代码同样精炼，改造后的dispatch入参接受的数据类型:
//  1、非function,不处理，将action 传给下一个中间件，最终都会根据传入的action计算相应的reducers(开头说的自执行)————store.dispatch(action)
//  2、function类型的action, 自动触发函数，并且将store.dispatch传入


//这样就很好理解了

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    itemDetailGet: (...args) => dispatch(actions.itemDetailGet(...args)),
    itemUpdate: (...args) => dispatch(actions.itemUpdate(...args)),
  }
};
//这里先调用  actions.itemDetailGet(...args) 该方法执行后返回一个函数，该函数可以接收一个{dispatch,getStore对象}，
//将该对象传入thunkMiddleware，thunkMiddleware判断入参为function，自动为其传入参入并执行该函数
