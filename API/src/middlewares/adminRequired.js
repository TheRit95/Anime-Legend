export default (req, res, next) => {
    // Vérifie si aucun utilisateur n'est connecté ou si l'utilisateur connecté n'est pas un admin
    // Si l'une de ces conditions est remplie, on renvoie une erreur 403 (action interdite)
    if (!req.session.user || !req.session.user.isAdmin) {
        // 403 : Forbidden - L'utilisateur n'a pas les autorisations nécessaires pour accéder à cette ressource
        res.status(403).json({message: "Vous n'êtes pas autorisé à effectuer cette action"});
        return; // Arrête l'exécution de la fonction et ne passe pas à l'étape suivante
    }

    // Si l'utilisateur connecté est un admin, on passe à la prochaine étape (le middleware suivant ou le controller)
    if (req.session.user.isAdmin) {
        next(); // Passe à la prochaine étape de la requête
    }
}
