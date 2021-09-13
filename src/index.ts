import { of, from, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import axios from 'axios';

const o = of(5) // Promise.resolve(5)

o.subscribe({
  next: (value: any) => console.log('Next:', value),
  complete: () => console.log('Complete!'),
  error: (error) => console.log('Error!', error)
})
const query_github = 'repo:bechterev/todos';
let obs_github = new  Observable((observer) => {
  let constsource = axios.CancelToken.source();
  axios.get('https://api.github.com/search/repositories?q=' + query_github).
  then(response=> {observer.next(response.data);observer.complete(); 
     })})
obs_github.subscribe((x:string)=>{ console.log('size repository =', x['items'][0]['size'], 'byte')})    

const query_gitlab = 'Delegates_Events';
let obs_gitlab = new Observable((observer)=>{
  let source = axios.CancelToken.source();
  axios.get('https://gitlab.com/api/v4/projects?search='+query_gitlab).
  then(response=>{
    observer.next(response.data);
    observer.complete();
  })
})
obs_gitlab.subscribe(x=>console.log(x))