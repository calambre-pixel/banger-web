/* =====================
   EMAILJS CONFIG
   Completá con tus claves reales en https://www.emailjs.com
   ===================== */
const EMAILJS_PUBLIC_KEY  = "";   // ← Tu Public Key
const EMAILJS_SERVICE_ID  = "";   // ← Tu Service ID
const EMAILJS_TEMPLATE_ID = "";   // ← Tu Template ID

/* =====================
   DATOS DE PRODUCTOS
   precioNum = entero para calcular totales exactos
   ===================== */
const productos = [
  { id:  1, nombre: "BIG CHIEF DUO 2G",      precio: "$72.500", precioNum:  72500, imgSrc: "./img/BIGCHIEFDUO2G.png",      tipo: "thc" },
  { id:  2, nombre: "BOUTIQUE TRIPLE 2G",     precio: "$69.600", precioNum:  69600, imgSrc: "./img/BOUTIQUETRIPLE2G.png",   tipo: "thc" },
  { id:  3, nombre: "CAPSULA BIG CHIEF 1G",   precio: "$49.300", precioNum:  49300, imgSrc: "./img/CAPSULABIGCHIEF.png",    tipo: "thc" },
  { id:  4, nombre: "DOZO 2.5G",              precio: "$75.400", precioNum:  75400, imgSrc: "./img/DOZO25G.png",            tipo: "thc" },
  { id:  5, nombre: "ELF THC 5.5G",           precio: "$63.800", precioNum:  63800, imgSrc: "./img/ELFTHC55G.png",          tipo: "thc" },
  {
    id:  6, nombre: "ELF BAR 3G",             precio: "$55.000", precioNum:  55000, imgSrc: "./img/ELFBAR3G.png",
    tipo: "nicotina",
    sabores: ["Mango Ice","Watermelon","Blueberry","Strawberry","Peach Ice","Grape","Lemon Mint"]
  },
  {
    id:  7, nombre: "ELF BAR ICE KING 40000", precio: "$52.200", precioNum:  52200, imgSrc: "./img/ELFBARICEKING40000.png",
    tipo: "nicotina",
    sabores: ["Mango Ice","Watermelon Ice","Blueberry Ice","Strawberry Kiwi","Triple Mango"]
  },
  { id:  8, nombre: "GHOST 7G",               precio: "$75.400", precioNum:  75400, imgSrc: "./img/GHOST7G.png",            tipo: "thc" },
  { id:  9, nombre: "HALF BAKED 3G",          precio: "$58.000", precioNum:  58000, imgSrc: "./img/HALFBAKED3G.png",        tipo: "thc" },
  { id: 11, nombre: "JUNGLE BOYS 2G",         precio: "$60.900", precioNum:  60900, imgSrc: "./img/JUNGLEBOYS2G.png",       tipo: "thc" },
  { id: 12, nombre: "MUHAMEDS 2G",            precio: "$66.700", precioNum:  66700, imgSrc: "./img/MUHAMEDS2G.png",         tipo: "thc" },
  { id: 13, nombre: "PACKMAN 2G",             precio: "$63.800", precioNum:  63800, imgSrc: "./img/PACKMAN2G.png",          tipo: "thc" },
  { id: 14, nombre: "PACKMAN DUAL 2G",        precio: "$69.600", precioNum:  69600, imgSrc: "./img/PACKMANDUAL2G.png",      tipo: "thc" },
  { id: 15, nombre: "PEN AIRIS",              precio: "$34.800", precioNum:  34800, imgSrc: "./img/PENAIRIS.png",           tipo: "thc" },
  {
    id: 16, nombre: "PEN ELF",                precio: "$37.700", precioNum:  37700, imgSrc: "./img/PENELF.png",
    tipo: "nicotina",
    sabores: ["Mango","Blueberry","Strawberry Ice","Watermelon Ice"]
  },
  { id: 17, nombre: "PHENOM 8.0",             precio: "$78.300", precioNum:  78300, imgSrc: "./img/PHENOM80.png",           tipo: "thc" },
  { id: 18, nombre: "PULSE 5G",               precio: "$69.600", precioNum:  69600, imgSrc: "./img/PULSE5G.png",            tipo: "thc" },
  { id: 19, nombre: "SLUGGERS HITT 2G",       precio: "$78.300", precioNum:  78300, imgSrc: "./img/SLUGGERSHITT2G.png",     tipo: "thc" },
  { id: 20, nombre: "SLUGGERS SWITCH 2G",     precio: "$78.300", precioNum:  78300, imgSrc: "./img/SLUGGERSSWITCH2G.png",   tipo: "thc" },
  { id: 21, nombre: "TORCH 5G",               precio: "$69.600", precioNum:  69600, imgSrc: "./img/TORCH5G.png",            tipo: "thc" },
  { id: 22, nombre: "UNIVERSITY 2G",          precio: "$60.900", precioNum:  60900, imgSrc: "./img/UNIVERSITY2G.png",       tipo: "thc" },
  { id: 23, nombre: "VIVA LA HEMP 3.5G",      precio: "$58.000", precioNum:  58000, imgSrc: "./img/VIVALAHEMP35G.png",      tipo: "thc" }
];

/* =====================
   CARRITO
   Cada item: { nombre, variante, precio (string), precioNum (int) }
   Las genéticas múltiples generan un item por variedad.
   ===================== */
var carrito = [];

/* Agregar un único item */
function agregarItem(nombre, precioStr, precioNum, variante) {
  carrito.push({ nombre: nombre, variante: variante || "", precio: precioStr, precioNum: precioNum });
  actualizarContadorCarrito();
}

/* FIX GENÉTICAS: N variedades → N items individuales, cada uno suma su precio */
function agregarVariedades(nombre, precioStr, precioNum, variedades) {
  variedades.forEach(function(v) {
    carrito.push({ nombre: nombre, variante: v, precio: precioStr, precioNum: precioNum });
  });
  actualizarContadorCarrito();
}

function quitarDelCarrito(idx) {
  carrito.splice(idx, 1);
  actualizarContadorCarrito();
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarContadorCarrito();
  renderizarCarrito();
}

function actualizarContadorCarrito() {
  var el = document.getElementById("carrito-count");
  if (el) el.textContent = carrito.length;
}

/* Total exacto usando precioNum entero */
function calcularTotal() {
  return carrito.reduce(function(acc, item) { return acc + item.precioNum; }, 0);
}

function formatoPrecio(num) {
  return "$" + num.toLocaleString("es-AR");
}

/* =====================
   TOAST — feedback al agregar
   ===================== */
function mostrarToast(texto) {
  var viejo = document.getElementById("toast-agregado");
  if (viejo) { viejo.remove(); }

  var toast = document.createElement("div");
  toast.id = "toast-agregado";
  toast.innerHTML =
    '<span class="toast__icono">✓</span>' +
    '<span class="toast__texto">' + texto + '</span>' +
    '<button class="toast__ver" id="toast-ver-carrito">Ver carrito</button>';
  document.body.appendChild(toast);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() { toast.classList.add("toast--visible"); });
  });

  document.getElementById("toast-ver-carrito").addEventListener("click", function() {
    ocultarToast();
    renderizarCarrito();
    abrirOverlay("carrito-section");
  });

  setTimeout(ocultarToast, 3500);
}

function ocultarToast() {
  var t = document.getElementById("toast-agregado");
  if (!t) return;
  t.classList.remove("toast--visible");
  setTimeout(function() { if (t.parentNode) t.remove(); }, 300);
}

/* =====================
   OVERLAYS — control centralizado
   ids válidos: "carrito-section" | "modal-pago" | "modal-datos"
   ===================== */
function abrirOverlay(id) {
  cerrarTodosLosOverlays();
  document.getElementById(id).classList.add("activo");
  document.body.classList.add("popup-abierto");
}

function cerrarOverlay(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove("activo");
  if (!document.querySelector(".carrito-overlay.activo, .modal-overlay.activo")) {
    document.body.classList.remove("popup-abierto");
  }
}

function cerrarTodosLosOverlays() {
  ["carrito-section", "modal-pago", "modal-datos"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove("activo");
  });
  document.body.classList.remove("popup-abierto");
}

/* =====================
   RENDERIZAR PRODUCTOS
   ===================== */
function renderizarProductos(lista) {
  var grid = document.getElementById("grid-productos");
  if (!grid) return;
  grid.innerHTML = "";

  lista.forEach(function(p) {
    var card = document.createElement("article");
    card.className = "producto";

    var imagenHTML = p.imgSrc
      ? '<img src="' + p.imgSrc + '" alt="' + p.nombre + '" loading="lazy"' +
        ' onerror="this.style.display=\'none\';this.parentElement.querySelector(\'.producto__imagen--placeholder\').style.display=\'flex\'" />' +
        '<span class="producto__imagen--placeholder" style="display:none">sin imagen</span>'
      : '<span class="producto__imagen--placeholder">sin imagen</span>';

    card.innerHTML =
      '<div class="producto__imagen">' + imagenHTML + '</div>' +
      '<div class="producto__info">' +
        '<h3 class="producto__nombre">' + p.nombre + '</h3>' +
        '<hr class="producto__divider">' +
        '<p class="producto__precio">' + p.precio + '</p>' +
        '<button class="producto__btn">+ Agregar</button>' +
      '</div>';

    var abrirFn = function() { abrirPopup(p); };
    card.addEventListener("click", function(e) {
      if (e.target.classList.contains("producto__btn")) return;
      abrirFn();
    });
    card.querySelector(".producto__btn").addEventListener("click", function(e) {
      e.stopPropagation();
      abrirFn();
    });

    grid.appendChild(card);
  });
}

/* =====================
   POPUP PRODUCTO
   ===================== */
var productoActual  = null;
var seleccionActual = ""; // para nicotina (sabor único)

function abrirPopup(producto) {
  productoActual  = producto;
  seleccionActual = "";
  geneticaTipo      = "";
  geneticaSeleccion = [];

  document.getElementById("popup-nombre").textContent = producto.nombre;
  document.getElementById("popup-precio").textContent = producto.precio;
  document.getElementById("popup-seleccion-actual").textContent = "";
  document.getElementById("popup-sabores").style.display   = "none";
  document.getElementById("popup-geneticas").style.display = "none";

  var imgContainer = document.getElementById("popup-imagen");
  imgContainer.innerHTML = producto.imgSrc
    ? '<img src="' + producto.imgSrc + '" alt="' + producto.nombre + '" />'
    : "";

  if (producto.tipo === "nicotina" && producto.sabores && producto.sabores.length) {
    var container = document.getElementById("popup-opciones-sabores");
    container.innerHTML = "";
    producto.sabores.forEach(function(sab) {
      var btn = document.createElement("button");
      btn.className = "opcion-btn";
      btn.textContent = sab;
      btn.addEventListener("click", function() {
        container.querySelectorAll(".opcion-btn").forEach(function(b) { b.classList.remove("activo"); });
        btn.classList.add("activo");
        seleccionActual = sab;
        document.getElementById("popup-seleccion-actual").textContent = "Sabor: " + sab;
      });
      container.appendChild(btn);
    });
    document.getElementById("popup-sabores").style.display = "block";

  } else {
    renderizarPasoGenetica(1);
    document.getElementById("popup-geneticas").style.display = "block";
  }

  document.getElementById("popup-overlay").classList.add("activo");
  document.body.classList.add("popup-abierto");
}

function cerrarPopup() {
  document.getElementById("popup-overlay").classList.remove("activo");
  if (!document.querySelector(".carrito-overlay.activo, .modal-overlay.activo")) {
    document.body.classList.remove("popup-abierto");
  }
  productoActual    = null;
  seleccionActual   = "";
  geneticaTipo      = "";
  geneticaSeleccion = [];
}

/* =====================
   GENÉTICAS — DOS PASOS
   ===================== */
var geneticaTipo      = "";
var geneticaSeleccion = [];

var geneticaVariedades = {
  "Indica":  ["OG Kush","Purple Punch","Granddaddy Purple","Northern Lights","Blueberry"],
  "Sativa":  ["Sour Diesel","Jack Herer","Green Crack","Durban Poison","Strawberry Cough"],
  "Híbrida": ["Blue Dream","Gelato","Runtz","Wedding Cake","Gorilla Glue"]
};

function renderizarPasoGenetica(paso) {
  var container = document.getElementById("popup-geneticas");
  container.innerHTML = "";

  if (paso === 1) {
    var label = document.createElement("p");
    label.className = "popup__label";
    label.textContent = "Elegí el tipo:";
    container.appendChild(label);

    var btns = document.createElement("div");
    btns.className = "popup__opciones";
    ["Indica","Sativa","Híbrida"].forEach(function(tipo) {
      var btn = document.createElement("button");
      btn.className = "opcion-btn";
      btn.textContent = tipo;
      btn.addEventListener("click", function() {
        geneticaTipo      = tipo;
        geneticaSeleccion = [];
        document.getElementById("popup-seleccion-actual").textContent = "Tipo: " + tipo;
        renderizarPasoGenetica(2);
      });
      btns.appendChild(btn);
    });
    container.appendChild(btns);

  } else if (paso === 2) {
    var labelTipo = document.createElement("p");
    labelTipo.className = "popup__label";
    labelTipo.textContent = geneticaTipo + " — Elegí variedad(es):";
    container.appendChild(labelTipo);

    var btnsVar = document.createElement("div");
    btnsVar.className = "popup__opciones";
    (geneticaVariedades[geneticaTipo] || []).forEach(function(v) {
      var btn = document.createElement("button");
      btn.className = "opcion-btn";
      btn.textContent = v;
      btn.addEventListener("click", function() {
        var idx = geneticaSeleccion.indexOf(v);
        if (idx === -1) {
          geneticaSeleccion.push(v);
          btn.classList.add("activo");
        } else {
          geneticaSeleccion.splice(idx, 1);
          btn.classList.remove("activo");
        }
        /* Feedback visual de selección múltiple */
        if (geneticaSeleccion.length === 0) {
          document.getElementById("popup-seleccion-actual").textContent = "Tipo: " + geneticaTipo;
        } else {
          document.getElementById("popup-seleccion-actual").textContent =
            geneticaSeleccion.length + " elegida(s): " + geneticaSeleccion.join(", ");
        }
      });
      btnsVar.appendChild(btn);
    });
    container.appendChild(btnsVar);

    var btnVolver = document.createElement("button");
    btnVolver.className = "opcion-btn";
    btnVolver.textContent = "← Cambiar tipo";
    btnVolver.style.marginTop = "0.5rem";
    btnVolver.addEventListener("click", function() {
      geneticaTipo      = "";
      geneticaSeleccion = [];
      document.getElementById("popup-seleccion-actual").textContent = "";
      renderizarPasoGenetica(1);
    });
    container.appendChild(btnVolver);
  }
}

/* =====================
   RENDERIZAR CARRITO
   ===================== */
function renderizarCarrito() {
  var lista   = document.getElementById("carrito-lista");
  var totalEl = document.getElementById("carrito-total");
  if (!lista) return;

  if (carrito.length === 0) {
    lista.innerHTML = '<p style="color:var(--color-muted);font-size:0.85rem;padding:1rem 0;">El carrito está vacío.</p>';
    totalEl.textContent = "";
    return;
  }

  lista.innerHTML = "";
  carrito.forEach(function(item, idx) {
    var div = document.createElement("div");
    div.className = "carrito-item";
    div.innerHTML =
      '<div>' +
        '<p class="carrito-item__nombre">' + item.nombre + '</p>' +
        (item.variante ? '<p class="carrito-item__sel">' + item.variante + '</p>' : '') +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:0.5rem;">' +
        '<span class="carrito-item__precio">' + item.precio + '</span>' +
        '<button class="carrito-item__quitar" data-idx="' + idx + '">✕</button>' +
      '</div>';
    lista.appendChild(div);
  });

  lista.querySelectorAll(".carrito-item__quitar").forEach(function(btn) {
    btn.addEventListener("click", function() {
      quitarDelCarrito(parseInt(btn.dataset.idx));
    });
  });

  totalEl.textContent = "Total estimado: " + formatoPrecio(calcularTotal());
}

/* =====================
   MODAL 1 — PAGO: renderizar resumen
   ===================== */
function renderizarResumenPago() {
  var res = document.getElementById("modal-pago-resumen");
  if (!res) return;
  res.innerHTML = "";

  carrito.forEach(function(item) {
    var row = document.createElement("div");
    row.className = "modal-resumen__item";
    row.innerHTML =
      '<div>' +
        '<span class="modal-resumen__nombre">' + item.nombre + '</span>' +
        (item.variante ? '<span class="modal-resumen__variante"> — ' + item.variante + '</span>' : '') +
      '</div>' +
      '<span class="modal-resumen__precio">' + item.precio + '</span>';
    res.appendChild(row);
  });

  var totalRow = document.createElement("div");
  totalRow.className = "modal-resumen__total";
  totalRow.innerHTML =
    '<span>Total</span><span>' + formatoPrecio(calcularTotal()) + '</span>';
  res.appendChild(totalRow);
}

/* =====================
   EMAILJS — ENVÍO
   ===================== */
function enviarPedido() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  var nombre    = document.getElementById("f-nombre").value.trim();
  var telefono  = document.getElementById("f-telefono").value.trim();
  var email     = document.getElementById("f-email").value.trim();
  var provincia = document.getElementById("f-provincia").value.trim();
  var localidad = document.getElementById("f-localidad").value.trim();
  var direccion = document.getElementById("f-direccion").value.trim();
  var sucursal  = document.getElementById("f-sucursal").value.trim();

  if (!nombre || !telefono || !email || !provincia || !localidad || !direccion) {
    alert("Por favor completá todos los campos obligatorios.");
    return;
  }

  var productosStr = carrito.map(function(item) {
    return "• " + item.nombre + (item.variante ? " — " + item.variante : "") + "  " + item.precio;
  }).join("\n");

  var params = {
    nombre:    nombre,
    telefono:  telefono,
    email:     email,
    provincia: provincia,
    localidad: localidad,
    direccion: direccion,
    sucursal:  sucursal || "No especificada",
    productos: productosStr,
    total:     formatoPrecio(calcularTotal())
  };

  var btnEnviar = document.getElementById("btn-enviar-pedido");
  btnEnviar.textContent = "Enviando...";
  btnEnviar.disabled = true;

  emailjs.init(EMAILJS_PUBLIC_KEY);
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(function() {
      document.getElementById("checkout-mensaje").style.display = "block";
      document.getElementById("checkout-form").style.display    = "none";
      vaciarCarrito();
    })
    .catch(function(err) {
      console.error("EmailJS error:", err);
      btnEnviar.textContent = "Confirmar pedido";
      btnEnviar.disabled = false;
      alert("Error al enviar el pedido. Revisá las claves de EmailJS en main.js.");
    });
}

/* =====================
   INIT
   ===================== */
document.addEventListener("DOMContentLoaded", function() {

  var CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqjaybQH7-52LQ0r1wkpHJVNIIC-hZvGr3GuqHS1qnUZnKIkPaq6hAwb9gAHtKjeU2tPmHjGRwuu1I/pub?output=csv";
  fetch(CSV_URL)
    .then(function(res) { return res.text(); })
    .then(function(csv) {
      var lineas = csv.split("\n").slice(1);
      var lista = [];
      lineas.forEach(function(linea, i) {
        if (!linea.trim()) return;
        var cols = linea.split(",");
        var nombreVal   = (cols[0] || "").trim().replace(/^"|"$/g, "");
        var precioBase  = parseFloat((cols[1] || "0").trim().replace(/^"|"$/g, "").replace(/[^\d.]/g, "")) || 0;
        var categoriaVal = (cols[2] || "").trim().replace(/^"|"$/g, "");
        var geneticasVal = (cols[3] || "").trim().replace(/^"|"$/g, "");
        var imagenVal   = (cols[4] || "").trim().replace(/^"|"$/g, "");
        if (!nombreVal) return;
        var obj = {
          id:       i + 1,
          nombre:   nombreVal,
          precio:   "$" + precioBase.toLocaleString("es-AR"),
          precioNum: precioBase,
          imgSrc:   imagenVal || "",
          tipo:     categoriaVal
        };
        if (geneticasVal) {
          obj.geneticas = geneticasVal.split("|").map(function(g) { return g.trim(); });
        }
        lista.push(obj);
      });
      renderizarProductos(lista);
    })
    .catch(function(err) {
      console.error("Error cargando productos desde CSV:", err);
      renderizarProductos(productos);
    });

  /* ── Popup producto ── */
  document.getElementById("popup-cerrar").addEventListener("click", cerrarPopup);
  document.getElementById("popup-overlay").addEventListener("click", function(e) {
    if (e.target === this) cerrarPopup();
  });
  document.getElementById("popup-volver").addEventListener("click", cerrarPopup);

  /* Botón "Agregar al carrito" con validación de selección */
  document.getElementById("popup-agregar").addEventListener("click", function() {
    if (!productoActual) return;

    var tipo = productoActual.tipo;

    /* ── Nicotina: debe tener sabor elegido ── */
    if (tipo === "nicotina") {
      if (!seleccionActual) {
        alert("Por favor elegí un sabor antes de agregar.");
        return;
      }
      agregarItem(productoActual.nombre, productoActual.precio, productoActual.precioNum, seleccionActual);
      var nombreProducto = productoActual.nombre + " — " + seleccionActual;
      cerrarPopup();
      mostrarToast("<strong>" + nombreProducto + "</strong> agregado");
      return;
    }

    /* ── THC: debe tener al menos 1 genética ── */
    if (tipo === "thc") {
      /* Si no llegó al paso 2 o no eligió variedad */
      if (!geneticaTipo) {
        alert("Por favor elegí el tipo de genética (Indica / Sativa / Híbrida).");
        return;
      }
      if (geneticaSeleccion.length === 0) {
        alert("Por favor elegí al menos una variedad antes de agregar.");
        return;
      }

      /* Cada variedad = 1 item individual con su precio completo */
      var variedadesConTipo = geneticaSeleccion.map(function(v) {
        return geneticaTipo + ": " + v;
      });
      agregarVariedades(
        productoActual.nombre,
        productoActual.precio,
        productoActual.precioNum,
        variedadesConTipo
      );

      var resumenVariedades = geneticaSeleccion.length === 1
        ? "<strong>" + productoActual.nombre + "</strong> — " + variedadesConTipo[0] + " agregado"
        : "<strong>" + productoActual.nombre + "</strong>: " + geneticaSeleccion.length + " variedades agregadas";

      cerrarPopup();
      mostrarToast(resumenVariedades);
      return;
    }

    /* ── Fallback: producto sin tipo especial ── */
    agregarItem(productoActual.nombre, productoActual.precio, productoActual.precioNum, "");
    cerrarPopup();
    mostrarToast("<strong>" + productoActual.nombre + "</strong> agregado");
  });

  /* ── Carrito ── */
  document.getElementById("btn-carrito").addEventListener("click", function() {
    var sec = document.getElementById("carrito-section");
    if (sec.classList.contains("activo")) {
      cerrarTodosLosOverlays();
    } else {
      renderizarCarrito();
      abrirOverlay("carrito-section");
    }
  });

  document.getElementById("btn-cerrar-carrito").addEventListener("click", cerrarTodosLosOverlays);

  document.getElementById("carrito-section").addEventListener("click", function(e) {
    if (e.target === this) cerrarTodosLosOverlays();
  });

  document.getElementById("btn-vaciar-carrito").addEventListener("click", vaciarCarrito);

  document.getElementById("btn-seguir-comprando").addEventListener("click", function() {
    cerrarTodosLosOverlays();
    var cat = document.getElementById("catalogo");
    if (cat) cat.scrollIntoView({ behavior: "smooth" });
  });

  /* ── Carrito → Modal 1 (Pago) ── */
  document.getElementById("btn-ir-checkout").addEventListener("click", function() {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    renderizarResumenPago();
    abrirOverlay("modal-pago");
  });

  /* ── Modal 1 — Pago ── */
  document.getElementById("btn-cerrar-modal-pago").addEventListener("click", cerrarTodosLosOverlays);
  document.getElementById("modal-pago").addEventListener("click", function(e) {
    if (e.target === this) cerrarTodosLosOverlays();
  });

  document.getElementById("btn-volver-carrito-desde-pago").addEventListener("click", function() {
    renderizarCarrito();
    abrirOverlay("carrito-section");
  });

  /* ── Modal 1 → Modal 2 (Datos) ── */
  document.getElementById("btn-continuar-datos").addEventListener("click", function() {
    /* Resetear formulario a estado limpio */
    document.getElementById("checkout-mensaje").style.display = "none";
    document.getElementById("checkout-form").style.display    = "flex";
    var btnEnviar = document.getElementById("btn-enviar-pedido");
    btnEnviar.textContent = "Confirmar pedido";
    btnEnviar.disabled = false;
    abrirOverlay("modal-datos");
  });

  /* ── Modal 2 — Datos ── */
  document.getElementById("btn-cerrar-modal-datos").addEventListener("click", cerrarTodosLosOverlays);
  document.getElementById("modal-datos").addEventListener("click", function(e) {
    if (e.target === this) cerrarTodosLosOverlays();
  });

  document.getElementById("btn-volver-modal-pago").addEventListener("click", function() {
    renderizarResumenPago();
    abrirOverlay("modal-pago");
  });

  document.getElementById("btn-enviar-pedido").addEventListener("click", enviarPedido);

  /* ── Copiar wallet ── */
  document.getElementById("btn-copy-wallet").addEventListener("click", function() {
    var wallet = document.getElementById("wallet-addr").textContent;
    navigator.clipboard.writeText(wallet).then(function() {
      var btn = document.getElementById("btn-copy-wallet");
      btn.textContent = "✓ Copiado";
      setTimeout(function() { btn.textContent = "Copiar"; }, 2000);
    });
  });

  /* ── ESC: cierra cualquier overlay abierto ── */
  document.addEventListener("keydown", function(e) {
    if (e.key !== "Escape") return;
    var popupOverlay = document.getElementById("popup-overlay");
    if (popupOverlay.classList.contains("activo")) {
      cerrarPopup();
      return;
    }
    cerrarTodosLosOverlays();
  });

});
test
