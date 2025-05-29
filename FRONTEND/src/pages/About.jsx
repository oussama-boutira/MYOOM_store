import React from "react";
import "../styles/About.css";
import { motion } from "framer-motion";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.section 
        className="about-main"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="about-content">
          <div className="about-text">
            <h1>À propos de MYOOM Store</h1>
            <p>
              Bienvenue chez MYOOM Store, votre boutique en ligne dédiée à l'informatique et aux setups gaming !
            </p>
            <p>
              Notre mission est de proposer les meilleurs produits, au meilleur prix, avec un service client irréprochable.
            </p>
            <p>
              Livraison rapide partout au Maroc et en Afrique, paiement sécurisé, et garantie sur tous nos produits.
              Notre équipe passionnée vous accompagne dans tous vos projets tech !
            </p>
          </div>
          <motion.div className="about-image">
            <motion.img 
              src="/banner.jpg" 
              alt="MYOOM Store Banner" 
              className="about-banner"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="about-values"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <h2>Nos valeurs</h2>
        <motion.div className="granddiv" variants={staggerContainer}>
          <motion.div className="div" variants={fadeInUp}>
            <span role="img" aria-label="Livraison">🚚</span>
            <h3>Livraison 24H/48h</h3>
            <p>Livraison à domicile partout en Afrique</p>
          </motion.div>

          <motion.div className="div" variants={fadeInUp}>
            <span role="img" aria-label="Paiement">💰</span>
            <h3>Paiement</h3>
            <p>Paiement à la livraison ou Virement Bancaire</p>
          </motion.div>

          <motion.div className="div" variants={fadeInUp}>
            <span role="img" aria-label="Garantie">🎆</span>
            <h3>Garantie</h3>
            <p>Garantie 1 an pièces et main d'œuvre<br />SAV +212666998384</p>
          </motion.div>

          <motion.div className="div" variants={fadeInUp}>
            <span role="img" aria-label="Service Client">🥇</span>
            <h3>Service Client</h3>
            <p>Disponible du lundi au samedi<br />de 10h à 19h</p>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default About;