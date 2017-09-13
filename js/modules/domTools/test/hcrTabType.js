/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/hcrTabType',function( tab ){
	
	let returnVal = false,
			err = '';
	
	typeof tab === 'undefined' ? 
		tab = _engine.domTools.get.hcrTabActive() : 
		typeof tab[0] !== 'undefined' ?
			tab = tab[0] :
			tab = tab;
	
	if( tab ){
			
		let nodeData = dijit.registry.byNode( tab ),
				typeMatch = {
					'HCRIntegratedCase' : "Integrated Case",
					'PersonHome' : "Person Page",
					'HCRPersonHome' : "Person Page",
					'PersonSearch' : "Person Search",
					'CaseSearch' : "Case Search",
					'EvidenceType' : "Evidence|" + nodeData.page.title.split('-')[0].trim(),
					'CommonIntakeMyApplications' : "My Application Cases",
					'CommonIntakeApplicationCase': 'Application Case',
					'EmployerSearch' : "Employer Search",
					'ParticipantSearch' : "All Participants Search",
					'CommonIntakeApplicationSearch' : "Application Case Search",
					'InvestigationSearch' : "Investigation Search",
					'IncidentSearch' : "Incident Search",
					'EducationalInstituteSearch' : "Educational Institute Search",
					'ExternalPartySearch' : "External Party Search",
					'ExternalPartyOfficeSearch' : "External Party Office Search",
					'UtilitySearch' : "Utility Search",
					'MyCaseQueries' : "My Case Queries",
					'MyItemsOfInterest' : "My Items of Interest",
					'MyCases' : "My Cases",
					'MyRecentlyApprovedCases' : "My Recently Approved Cases",
					'MyRecentlyAssignedCases' : "Cases Recently Assigned to Me",
					'MyRecentlyViewedCases' : "Recently Viewed Cases",
					'MyServicePlans' : "My Service Plans",
					'StreamlinedMedicaidHome' : "PDC|medical assistance",
					"StreamlineMedicaidDecision": 'PDC|medical assistance decision',
					'HCRStateBasicHealthPlanPDHome' : "PDC|minnesotacare",
					'StateBasicPlanDecision': 'PDC|minnesotacare decision',
					'HCRInsuranceAssistanceHome' : "PDC|insurance assistance",
					'HCRUnassistedQualifiedHealthPlanPDHome' : "PDC|unassisted qualified health plan",
					'UQHPDecision': 'PDC|unassisted qualified health plan decision'
				};
				
		if( typeof typeMatch[ nodeData.page.params.tabDescriptor.tabID ] !== 'undefined' )
			returnVal = typeMatch[ nodeData.page.params.tabDescriptor.tabID ];
		else err = `[hcrTabType] Undefined tab type: ${ nodeData.page.params.tabDescriptor.tabID }`;
		
	}
	else err = "Tab information could not be determined or defined.";
	
	if( err ) _engine.debug.warn( `[hcrTabType] ${ err }` );
	
	return returnVal;
	
});