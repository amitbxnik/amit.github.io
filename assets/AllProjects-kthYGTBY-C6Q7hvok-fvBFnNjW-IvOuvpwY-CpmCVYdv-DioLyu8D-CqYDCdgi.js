import{p as e}from"./index-TB8iojQ2.js";import{n as a}from"./Data-B86zc8Ew-VmAa7w0Y-VmAa7w0Y-VmAa7w0Y-VmAa7w0Y-VmAa7w0Y-VmAa7w0Y.js";const d=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"container py-3 py-md-5 w-75",children:[e.jsx("div",{className:"mb-3 mb-md-5",children:e.jsx("h1",{className:"fs-2 fs-md-1",children:"All Projects"})}),e.jsx("div",{className:"row g-3 g-md-4",children:a.map(s=>e.jsx("div",{className:"col-12 col-sm-6 col-lg-4",children:e.jsxs("div",{className:"card h-100 shadow-sm d-flex flex-column",children:[e.jsx("img",{src:s.image,className:"card-img-top",alt:s.title,style:{objectFit:"cover",cursor:"pointer",height:"160px"},onClick:()=>window.open(s.image,"_blank")}),e.jsxs("div",{className:"card-body d-flex flex-column p-3",children:[e.jsxs("div",{className:"text-center mb-2",children:[e.jsx("h5",{className:"card-title mb-1 fs-6 fs-md-5",children:s.title}),s.featured&&e.jsxs("span",{className:"badge bg-warning text-dark",children:[e.jsx("i",{className:"bi bi-star-fill me-1"}),"Featured"]})]}),e.jsx("p",{className:"card-text text-muted flex-grow-1 mb-3",style:{fontSize:"0.85rem",lineHeight:"1.4"},dangerouslySetInnerHTML:{__html:s.description}}),e.jsxs("div",{className:"mt-auto",children:[s.projectLinks&&s.projectLinks.length>0&&e.jsx("div",{className:"d-flex flex-column flex-sm-row gap-2 mb-3",children:s.projectLinks.map((t,l)=>e.jsxs("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-dark btn-sm flex-sm-fill",role:"button",style:{fontSize:"0.8rem"},children:[e.jsx("i",{className:`${t.icon} me-1`}),t.text]},l))}),e.jsxs("div",{className:"d-flex flex-wrap gap-1",children:[s.tags&&s.tags.length>0&&s.tags.slice(0,6).map((t,l)=>e.jsx("span",{className:"badge bg-secondary",style:{fontSize:"0.7rem"},children:t},l)),s.tags&&s.tags.length>6&&e.jsxs("span",{className:"badge bg-light text-muted",style:{fontSize:"0.7rem"},children:["+",s.tags.length-6]})]})]})]})]})},s.id))}),e.jsx("style",{children:`
        @media (max-width: 768px) {
          .container {
            width: 95% !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
        
        @media (max-width: 576px) {
          .card-body {
            padding: 1rem !important;
          }
          
          .card-title {
            line-height: 1.3;
          }
        }
      `})]})});export{d as default};
