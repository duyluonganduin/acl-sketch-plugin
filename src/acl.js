/* ======================================== */
/* APL Sketch Plugin
/* Description
/* ======================================== */

/* ======================================== */
/* Load Sketch APIs
/* ======================================== */
const sketch = require('sketch')
const Group = sketch.Group
const Shape = sketch.Shape
const Rectangle = sketch.Rectangle
const Page = sketch.Page
const Artboard = sketch.Artboard
const Layer = sketch.Layer

/* ======================================== */
/* ACL constants
/* ======================================== */
const aclJsonUrl = 'https://api.jsonbin.io/b/5b62a032e013915146cc8930/2'

/* ======================================== */
/* Define some data sample
/* ======================================== */
const moneyPostFix = [ 'B', 'M', 'K' ]
const fundingType = ['Note', 'Kiss Note', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D']


/* ======================================== */
/* Get random int
/* ======================================== */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* ======================================== */
/* Generate short money
/* Example: $10B, $10M
/* ======================================== */

export function generateShortMoneyNumber(context) {
	
	var document = sketch.fromNative(context.document)
	var selection = document.selectedLayers

	selection.forEach(layer => {
		layer.text = "$" + getRandomInt(100) + "." + getRandomInt(100) + moneyPostFix[getRandomInt(moneyPostFix.length)]
	})

	sketch.UI.message('✅ Done!')
}

/* ======================================== */
/* Generate full money
/* Example: $10,000,000, $10,000,0000,000
/* ======================================== */

export function generateMoneyNumber(context) {
	
	var document = sketch.fromNative(context.document)
	var selection = document.selectedLayers

	selection.forEach(layer => {

		// Generate first number
		var money = getRandomInt(1000)

		// Generate number of zero after money
		var numberOfZero = getRandomInt(12)

		// Generate string with , like 23,000,000
		var orginalStr = '' + money, finalStr = ''

		for (var i = 0; i < numberOfZero; i++) {
			orginalStr = orginalStr + '0'
		}

		// Add comma to number

		for (var i = orginalStr.length - 1; i >=0; i--) {
			finalStr = orginalStr[i] + finalStr
			if ( ( 0 === ( ( orginalStr.length - i ) % 3 ) ) & ( i > 0 ) ) {
				finalStr = ',' + finalStr
			}
		}

		// Apply to selections

		layer.text = "$" + finalStr
	})

	sketch.UI.message('✅ Done!')
}

/* ======================================== */
/* Generate entity name
/* ======================================== */

export function generateEntityName(context) {
	var document = sketch.fromNative(context.document)
	sketch.UI.message('✅ Start!')
	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			sketch.UI.message('✅ Done!')
			var entities = json.entities.companies.concat(json.entities.lawfirms, json.entities.vcs)
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = entities[getRandomInt(entities.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

/* ======================================== */
/* Generate company name
/* ======================================== */

export function generateCompanyName(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var companies = json.entities.companies
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = companies[getRandomInt(companies.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

/* ======================================== */
/* Generate VC name
/* ======================================== */

export function generateVCName(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var vcs = json.entities.vcs
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = vcs[getRandomInt(vcs.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

/* ======================================== */
/* Generate Lawfirm name
/* ======================================== */

export function generateLawfirmName(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var lawfirms = json.entities.lawfirms
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = lawfirms[getRandomInt(lawfirms.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

/* ======================================== */
/* Generate Turn
/* ======================================== */

export function generateTurn(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var turns = json.turns.termsheet.concat(json.turns.dealdocs, json.turns.legaldiligence, json.turns.signature, json.turns.wiring, json.turns.closing)
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = turns[getRandomInt(turns.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

export function generateTurnTermSheet(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var turns = json.turns.termsheet
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = turns[getRandomInt(turns.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

export function generateTurnDealDocs(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var turns = json.turns.dealdocs
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = turns[getRandomInt(turns.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

export function generateTurnSignature(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var turns = json.turns.signature
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = turns[getRandomInt(turns.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

export function generateTurnWiring(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var turns = json.turns.wiring
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = turns[getRandomInt(turns.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

export function generateTurnClosing(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var turns = json.turns.closing
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = turns[getRandomInt(turns.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

/* ======================================== */
/* Generate User
/* ======================================== */
export function generateUser(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var users = json.users.male.concat(json.users.female)
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = users[getRandomInt(users.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

export function generateUserMale(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var users = json.users.male
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = users[getRandomInt(users.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

export function generateUserFemale(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var users = json.users.female
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = users[getRandomInt(users.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

/* ======================================== */
/* Generate Doc names
/* ======================================== */

export function generateDocTypeName(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var docnames = json.docnames
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = docnames[getRandomInt(docnames.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

export function generateFileName(context) {
	var document = sketch.fromNative(context.document)

	fetch(aclJsonUrl)
		.then(response => response.text())
		.then(text => {
			var json = JSON.parse(text)
			var filename = json.filenames
			var extension = json.filetypes
			var selection = document.selectedLayers
			selection.forEach(layer => {
				layer.text = filename[getRandomInt(filename.length)] + '.' + extension[getRandomInt(extension.length)]
			})
			sketch.UI.message('✅ Done!')
		})
		.catch(e => sketch.UI.message(e))
}

/* ======================================== */
/* Default function
/* ======================================== */

export default function(context) {
  context.document.showMessage("It's alive 🙌")
}