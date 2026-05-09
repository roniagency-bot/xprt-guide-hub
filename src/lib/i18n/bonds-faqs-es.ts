import type { BondsFaq } from "@/lib/bonds-faqs";

export const BONDS_FAQS_ES: Record<string, Partial<BondsFaq>> = {
  "what-is-a-surety-bond": {
    question: "¿Qué es una fianza surety?",
    shortAnswer:
      "Una fianza surety es una garantía entre tres partes: tú (el principal), la entidad que requiere la fianza (el obligante) y la compañía surety que la respalda. Protege al obligante o al público — no a ti — al garantizar que cumplirás ciertas obligaciones.",
    metaDescription:
      "Conoce cómo funcionan las fianzas surety, quiénes son el principal, el obligante y la surety, y por qué las fianzas protegen al público y no a la parte fianzada.",
    paragraphs: [
      "Una fianza surety no es un seguro tradicional. El seguro está diseñado para protegerte cuando algo te ocurre. Una fianza surety protege a otro — normalmente una agencia gubernamental, un tribunal o un miembro del público — de daños financieros causados por tus acciones o incumplimiento.",
      "Participan tres partes: el principal (tú, la persona o empresa que compra la fianza), el obligante (la entidad que la requiere) y la surety (la compañía que emite y respalda la fianza). Si la surety paga un reclamo válido, el principal generalmente debe reembolsar ese dinero.",
    ],
    bullets: [
      "Principal — la persona o empresa que debe estar fianzada",
      "Obligante — la agencia, tribunal o parte que requiere la fianza",
      "Surety — la compañía que emite y respalda la fianza",
      "Reclamos — pagados al obligante y normalmente reembolsados por el principal",
    ],
    stateContext:
      "Los requisitos de fianzas en Nevada y Colorado los define el obligante (como una junta estatal, ciudad, condado o tribunal). Dos contratistas del mismo oficio pueden necesitar fianzas muy distintas según la agencia que los licencie o regule.",
  },
  "why-do-i-need-a-bond": {
    question: "¿Por qué necesito una fianza?",
    shortAnswer:
      "Normalmente necesitas una fianza porque una agencia estatal, ciudad, tribunal o contrato la requiere antes de obtener una licencia, permiso o autorización para cumplir una obligación. La fianza ofrece una garantía financiera de que seguirás las reglas.",
    metaDescription:
      "Descubre por qué se requieren fianzas surety para licencias, permisos, contratos y cumplimiento en Nevada y Colorado.",
    paragraphs: [
      "Las fianzas se requieren con mayor frecuencia por ley, regulación o contrato. Una agencia de licencias puede requerir una fianza antes de emitir una licencia de contratista, concesionario o notario. Un tribunal puede requerir una fianza antes de aprobar un rol fiduciario. Un dueño de proyecto puede requerir una fianza de contrato antes de que un contratista comience.",
      "Sin la fianza requerida, normalmente no puedes obtener la licencia, el permiso o el contrato. La fianza es parte del proceso de calificación — no reemplaza el seguro, pero es un requisito previo para poder operar.",
    ],
    bullets: [
      "Fianzas de licencia y permiso — requeridas para obtener una licencia regulada",
      "Fianzas de contratista — requeridas por las juntas estatales de contratistas",
      "Fianzas de concesionario de autos — requeridas para operar como concesionario con licencia",
      "Fianzas de notario — requeridas para ser comisionado como notario",
      "Fianzas de contrato — requeridas por dueños de proyectos en ciertos trabajos",
      "Fianzas judiciales y fiduciarias — requeridas por jueces en casos específicos",
    ],
    stateContext:
      "En Nevada, los requisitos comunes de fianza vienen de la Junta Estatal de Contratistas, el DMV (concesionarios), la Secretaría de Estado (notario) y ciudades locales. En Colorado, los requisitos suelen venir de DORA, el Departamento de Ingresos (industria automotriz), municipios y tribunales.",
  },
  "is-a-bond-the-same-as-insurance": {
    question: "¿Una fianza es lo mismo que un seguro?",
    shortAnswer:
      "No. El seguro está diseñado para protegerte a ti. Una fianza surety está diseñada para proteger al obligante o al público de tu incumplimiento. Si se paga un reclamo de fianza, normalmente se espera que reembolses a la surety.",
    metaDescription:
      "Comprende la diferencia clave entre seguro y fianza surety, y por qué la fianza protege al obligante y no al principal.",
    paragraphs: [
      "El seguro es un acuerdo entre dos partes: tú y la aseguradora. Cuando ocurre un evento cubierto, la aseguradora te paga. Generalmente no devuelves ese reclamo.",
      "Una fianza surety es un acuerdo entre tres partes. Cuando se paga un reclamo válido, la surety paga al obligante en tu nombre — y luego te busca para que devuelvas ese dinero. Por eso las fianzas son técnicamente una forma de crédito, no un seguro.",
    ],
    bullets: [
      "El seguro protege al titular de la póliza",
      "Una fianza protege al obligante o al público",
      "Los reclamos del seguro se pagan a ti",
      "Los reclamos de fianza se pagan al obligante y luego los reembolsas",
      "Ambos pueden requerirse, pero cumplen propósitos distintos",
    ],
    stateContext:
      "Muchos dueños de negocio en Nevada y Colorado necesitan tanto seguro como fianzas — por ejemplo, un contratista puede necesitar responsabilidad general, compensación laboral y una fianza de licencia de contratista.",
  },
  "what-information-do-i-need-for-a-bond-quote": {
    question: "¿Qué información necesito para cotizar una fianza?",
    shortAnswer:
      "Para la mayoría de las fianzas estándar necesitas el tipo de fianza, el obligante, el monto requerido, el nombre legal y dirección del principal e información personal básica. Las fianzas más grandes o especializadas pueden requerir detalles financieros adicionales.",
    metaDescription:
      "Descubre qué información necesitas para iniciar una cotización de fianza surety en Nevada o Colorado, desde fianzas de licencia y permiso hasta fianzas de contrato.",
    paragraphs: [
      "El detalle más importante es exactamente cuál fianza se requiere. El obligante normalmente especifica el nombre, monto, número de formulario y periodo efectivo. Cotizar el formulario equivocado puede causar demoras o rechazos.",
      "Más allá de la fianza, la surety necesita saber a quién se va a fianzar. Para fianzas estándar pequeñas esto puede ser rápido. Para fianzas más grandes, fianzas de licencia de contratista o fianzas de contrato, la surety también puede pedir estados financieros, historial de trabajo o información de indemnizadores.",
    ],
    bullets: [
      "Nombre exacto de la fianza, formulario y monto requerido",
      "Obligante (la agencia o parte que requiere la fianza)",
      "Nombre legal del principal, dirección y tipo de entidad",
      "Información del propietario / oficial para garantías personales",
      "Número de licencia o solicitud, si aplica",
      "Información financiera para fianzas más grandes o de contrato",
    ],
    stateContext:
      "Los obligantes en Nevada y Colorado a menudo publican el formulario exacto de fianza que requieren. Llevarlo a la cotización ahorra tiempo y reduce el riesgo de emitir la fianza equivocada.",
  },
  "what-affects-bond-approval-and-pricing": {
    question: "¿Qué afecta la aprobación y el precio de la fianza?",
    shortAnswer:
      "La aprobación y el precio dependen del tipo de fianza, el monto, la visión del riesgo del suscriptor y los antecedentes del principal. Las fianzas estándar pequeñas pueden aprobarse al instante, mientras que las más grandes dependen más del crédito y la revisión financiera.",
    metaDescription:
      "Aprende cómo funciona la suscripción de fianzas surety y qué factores afectan la aprobación y el precio para fianzas de licencia, contratista y comerciales.",
    paragraphs: [
      "El precio de la fianza es generalmente un porcentaje del monto, no el total. El suscriptor evalúa el tipo de fianza y decide cuánto riesgo implica, lo que influye en la aprobación y la tarifa.",
      "Para muchas fianzas pequeñas de licencia y permiso, la aprobación es automatizada y el precio fijo. Para fianzas más grandes — contratista, contrato o comerciales especializadas — el historial crediticio, la experiencia, la solidez financiera y el historial de reclamos pueden afectar el resultado.",
    ],
    bullets: [
      "Tipo de fianza y riesgo inherente para la surety",
      "Monto requerido por el obligante",
      "Crédito personal e historial financiero del principal",
      "Experiencia y tiempo en la industria",
      "Reclamos, sentencias o acciones de licencia existentes",
      "Para fianzas de contrato: programa de obra, capital de trabajo y trayectoria de fianzas",
    ],
    stateContext:
      "Las fianzas de contratista en Nevada suelen mirar el límite monetario y la clasificación de la licencia. Las fianzas de Colorado pueden considerar el historial de licencia de DORA o, para concesionarios de autos, los requisitos del Departamento de Ingresos.",
  },
  "can-i-quote-and-purchase-my-bond-online": {
    question: "¿Puedo cotizar y comprar mi fianza en línea?",
    shortAnswer:
      "Sí — para muchas fianzas comunes, puedes iniciar la cotización, completar la solicitud y comprar tu fianza en línea. Las fianzas más grandes o especializadas pueden requerir que un suscriptor revise la solicitud antes de la emisión.",
    metaDescription:
      "Cotiza y compra fianzas de licencia, permiso, contratista, concesionario, notario, fidelidad y otras fianzas surety en línea en Nevada y Colorado.",
    paragraphs: [
      "Para muchas fianzas estándar — licencia y permiso, notario, fidelidad, fianzas pequeñas de contratista, fianzas de título y similares — la herramienta en línea te guía por el tipo de fianza, el monto y los datos del solicitante, y luego te entrega una cotización que puedes comprar de inmediato.",
      "Algunas fianzas requieren suscripción adicional. Las fianzas de contrato más grandes, ciertas fianzas comerciales o solicitudes con factores de riesgo específicos pueden pausarse para revisión. En esos casos, la solicitud pasa a un suscriptor y te contactarán con los próximos pasos.",
    ],
    bullets: [
      "Inicia la cotización en línea con el tipo y monto correctos",
      "Completa la solicitud y los datos personales/comerciales",
      "Obtén una cotización instantánea para muchas fianzas estándar",
      "Paga y recibe la fianza electrónicamente cuando se apruebe",
      "Aplica revisión de un suscriptor para fianzas más grandes o especializadas",
    ],
    stateContext:
      "La herramienta en línea admite muchos tipos comunes de fianzas en Nevada y Colorado, incluidos licencia, permiso, contratista, concesionario, notario, fidelidad y fianzas LDA / preparación de documentos. Completar una cotización no garantiza la aprobación ni la emisión.",
  },
};
