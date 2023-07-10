import Reactotron from 'ReactotronConfig';
export const LogReactotron =
  (value = "", title = "LOG", key = '', important = "false", image = false) => {
    Reactotron.display({
      name: title,
      value: value,
      preview: key,
      important: important,
      image: image//'http://placekitten.com/g/400/400'
    })
  }
  //benchmark
/**
 function slowFunction() {
const bench = Reactotron.benchmark("slow function benchmark")

// Code that does thing A
bench.step("Thing A")

// Code that does thing B
bench.step("Thing B")

// Code that does thing C
bench.stop("Thing C")
}
 */
  //state
  //asyncStore
  //api