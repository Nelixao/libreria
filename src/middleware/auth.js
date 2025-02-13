// Middleware para verificar si el usuario está autenticado
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // Si está autenticado, pasa al siguiente middleware
  } else {
    return res.redirect('/login'); // Si no está autenticado, redirige al login
  }
}

// Middleware para verificar si el usuario tiene uno de los roles especificados
function checkRole(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' }); // Si no hay usuario autenticado
    }
    if (roles.includes(req.user.rol)) {
      return next(); // Si el rol del usuario está en la lista de roles permitidos, pasa al siguiente middleware
    } else {
      return res.status(403).json({ error: 'Acceso denegado' }); // Si el rol no está permitido, acceso denegado
    }
  };
}

// Middleware para verificar si el usuario tiene el rol de administrador
function isAdmin(req, res, next) {
  if (req.user && req.user.rol === 'admin') {
    return next(); // Si es admin, pasa al siguiente middleware
  } else {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador' }); // Si no es admin, acceso denegado
  }
}

// Middleware para verificar si el usuario tiene el rol de vendedor
function isVendedor(req, res, next) {
  if (req.user && req.user.rol === 'vendedor') {
    return next(); // Si es vendedor, pasa al siguiente middleware
  } else {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de vendedor' }); // Si no es vendedor, acceso denegado
  }
}

module.exports = { checkAuth, checkRole, isAdmin, isVendedor };
