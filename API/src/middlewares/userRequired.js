export default (req, res, next) => {
    // Vérifie si aucun utilisateur n'est connecté dans la session
    if (!req.session.user) {
        // 403 : Forbidden - L'utilisateur doit être connecté pour accéder à cette ressource
        res.status(403).json({message: "Vous devez être connecté pour effectuer cette action !"});
        return; // Arrête l'exécution de la fonction et ne passe pas à l'étape suivante
    }

    // Si un utilisateur est connecté, on passe à la prochaine étape (le middleware suivant ou le controller)
    if (req.session.user) {
        next(); // Passe à l'étape suivante de la requête
    }
}
