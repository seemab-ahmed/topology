// Function to handle dropdown selection change
function handleDropdownChange() {
    const dropdown = document.getElementById("topologyDropdown");
    const selectedValue = dropdown.value;
 
    // Get diagram and form sections
    // diagram-topology-one
      const diagramSectionOne = document.getElementById("topo-1");
      const diagramSectionTwo = document.getElementById("topo-2");
    const outputSectionOneTopology = document.getElementById("outputSectionOneTopology");
    const outputSectionTwoTopology = document.getElementById("outputSectionTwoTopology");

    // Initially hide both sections
    diagramSectionOne.style.display = "none";
    diagramSectionTwo.style.display = "none";
    // formSection.style.display = "none";

    // Show only if "Simple Topo 1" is selected
    if (selectedValue === "simple Topo 1") {
        diagramSectionOne.style.display = "flex";

        // Update diagram title
        outputSectionOneTopology.textContent = selectedValue;
    }
    else if (selectedValue === "simple Topo 2") {
        diagramSectionTwo.style.display = "flex";

        // Update diagram title
        outputSectionTwoTopology.textContent = selectedValue;
    }
}
// Function to generate output based on input fields
function generateOutput(event) {
  // Prevent form submission
  if (event) event.preventDefault();

  // Get the selected topology value (add this element in your HTML if needed)
  const selectedTopology = document.getElementById('topologyDropdown')?.value;

    // Get input field values
    // VCP Name
    const vpcName = document.getElementById("vpcName").value;
    const VpcNameDiagram = document.getElementById("vpcNameDiagram");
    const vpcCIDR = document.getElementById("vpcCIDR").value;
    const VpcCIDRDiagram = document.getElementById("vcnCIDRNameDiagram");
    // public Subnet Name
    const publicSubnetName = document.getElementById("publicSubnetName").value;
    const publicSubnetCIDR = document.getElementById("publicSubnetCIDR").value;
    const publicSubnetNameDiagram = document.getElementById("publicNameDiagram");
    const publicSubnetCIDRDiagram = document.getElementById('publicCIDRDiagram');
  
    // private Subnet Name
    const privateSubnetName = document.getElementById("privateSubnetRange").value;
    const privateSubnetCIDR = document.getElementById("privateSubnetCIDR").value;
    const privateSubnetNameDiagram = document.getElementById("privateNameDiagram");
    const privateSubnetCIDRDiagram = document.getElementById('privateCIDRNameDiagram');
    // database Subnet Name
    const databaseSubnetName = document.getElementById("publicRTName").value;
    // const databaseSubnetCIDR = document.getElementById("privateSubnetCIDR").value;
    const databaseSubnetNameDiagram = document.getElementById("databaseNameDiagram");
    // const databaseSubnetCIDRDiagram = document.getElementById('databaseCIDRNameDiagram');
  /////////
    const generateTFPopup = document.getElementById('generate-TF-popup');

    // Validate required fields
    if (!selectedTopology) {
        alert("Please select a topology.");
        return;
    }
    VpcNameDiagram.innerHTML = vpcName;
    VpcCIDRDiagram.innerHTML = vpcCIDR;
    publicSubnetNameDiagram.innerHTML = publicSubnetName;
    publicSubnetCIDRDiagram.innerHTML = publicSubnetCIDR;
    privateSubnetNameDiagram.innerHTML = privateSubnetName;
    privateSubnetCIDRDiagram.innerHTML = privateSubnetCIDR;   
    databaseSubnetNameDiagram.innerHTML = databaseSubnetName;
}
 
// Function to populate data in the popup
function codeFieldData() {
    const codeVpcName = document.getElementById("vpcName").value;
    const CodeVpcCIDR = document.getElementById("vpcCIDR").value;
    const codeVpcPublicSLName = document.getElementById("publicSLName").value;
    const CodeVpcPublicRTName = document.getElementById("publicRTName").value;

    document.getElementById("code-vcn-name").innerHTML = codeVpcName;
    document.getElementById("code-vcn-cidr").innerHTML = CodeVpcCIDR;
    document.getElementById("code-vcn-sl-name").innerHTML = codeVpcPublicSLName;
    document.getElementById("code-vcn-rt-name").innerHTML = CodeVpcPublicRTName;
}

// Function to download data as a file
function downloadFiles() {
    // Get the dynamic content
    const vcnName = document.getElementById("code-vcn-name").innerHTML;
    const vcnCIDR = document.getElementById("code-vcn-cidr").innerHTML;
    const vcnSLName = document.getElementById("code-vcn-sl-name").innerHTML;
    const vcnRTName = document.getElementById("code-vcn-rt-name").innerHTML;

    // Prepare the content for the file
    const content = `
Create VCN Name: ${vcnName}
Create VCN CIDR: ${vcnCIDR}
Create Security List Name: ${vcnSLName}
Create Routing Table Name: ${vcnRTName}
    `.trim();

    // Create and trigger file download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "terraform_code.txt";
    a.click();
    URL.revokeObjectURL(url);
}

function generateTFPopup() {
    const generateTFPopup = document.getElementById('generate-TF-popup');
    generateTFPopup.style.display = 'block';
    codeFieldData ();
}
function generateTFPopup2() {
    const generateTFPopup = document.getElementById('generate-TF-popup-2');
    generateTFPopup.style.display = 'block';
    codeFieldData ();
}

function generateClosePopup () {
   const generateTFClosePopup= document.getElementById('generate-TF-popup');
   generateTFClosePopup.style.display = 'none';
}

function generateClosePopup2 () {
   const generateTFClosePopup= document.getElementById('generate-TF-popup-2');
   generateTFClosePopup.style.display = 'none';
}
// ///////////////////////////// ALL POPUPS/////////////////
// /////////// Right top popup
  function showPopup() {
    const popup = document.getElementById("popupTable");
    popup.style.display = "block"; 
  }
  
  // Function to close the popup
  function closePopup() {
    const rightToppopup = document.getElementById("popupTable");
    rightToppopup.style.display = "none"; // Hide the popup
  }
  
  // Add event listener to sl-pub element
   document.querySelector("#table-top-img").addEventListener("click", showPopup);

  // ////////////////// Right bottom popup
  function rightBottomshowPopup() {
    const rightBottompopup = document.getElementById("rightBottompopupTable");
    rightBottompopup.style.display = "block"; // Make the popup visible
  }
  
  // Function to close the popup
  function rightBottomclosePopup() {
    const rightBottompopup = document.getElementById("rightBottompopupTable");
    rightBottompopup.style.display = "none"; // Hide the popup
  }

  // ////////////////// Right bottom popup
  function rightThreeshowPopup() {
    const rightThreepopup = document.getElementById("rightThreepopupTable");
    rightThreepopup.style.display = "block"; // Make the popup visible
  }
  
  // Function to close the popup
  function rightThreeclosePopup() {
    const rightThreepopup = document.getElementById("rightThreepopupTable");
    rightThreepopup.style.display = "none"; // Hide the popup
  }

  // ////////////////// Right bottom popup
  function rightFourshowPopup() {
    const rightFourpopup = document.getElementById("rightFourpopupTable");
    rightFourpopup.style.display = "block"; // Make the popup visible
  }
  
  // Function to close the popup
  function rightFourclosePopup() {
    const rightFourpopup = document.getElementById("rightFourpopupTable");
    rightFourpopup.style.display = "none"; // Hide the popup
  }
  
  // Add event listener to sl-pub element table-bottom-img
  //  document.querySelector("#table-bottom-img").addEventListener("click", rightBottomshowPopup);

///////////   left side top popup
function leftshowPopup() {
    const leftpopup = document.getElementById("leftpopupTable");
    leftpopup.style.display = "block"; // Make the popup visible
  }
  
  // Function to close the popup
  function leftClosePopup() {
    const leftpopup = document.getElementById("leftpopupTable");
    leftpopup.style.display = "none"; // Hide the popup
  }
  
  // Add event listener to sl-pub element
  // document.querySelector(".table-left-top").addEventListener("click", leftshowPopup);

///////////   left side center popup
function leftCenterPopup() {
    const leftCenterPopup = document.getElementById("leftCenterpopupTable");
    leftCenterPopup.style.display = "block"; // Make the popup visible
  }
  
  // Function to close the popup
  function leftCenterClosePopup() {
    const leftCloseCenterpopup = document.getElementById("leftCenterpopupTable");
    leftCloseCenterpopup.style.display = "none"; // Hide the popup
  }
  
  // Add event listener to sl-pub element
  // document.querySelector(".table-left-top").addEventListener("click", leftshowPopup);


///////////   left side bottom popup
function leftButtomPopup() {
    const leftBottompopup = document.getElementById("leftButtompopupTable");
    leftBottompopup.style.display = "block"; // Make the popup visible
  }
  
  // Function to close the popup
  function leftBottomClosePopup() {
    const leftCloseBottompopup = document.getElementById("leftButtompopupTable");
    leftCloseBottompopup.style.display = "none"; // Hide the popup
  }
///////////   left side Finnal bottom popup
function leftFinnalPopup() {
    const leftFinnalpopup = document.getElementById("leftFinnalpopupTable");
    leftFinnalpopup.style.display = "block"; // Make the popup visible
  }
  
  // Function to close the popup
  function leftFinnalClosePopup() {
    const leftCloseFinnalpopup = document.getElementById("leftFinnalpopupTable");
    leftCloseFinnalpopup.style.display = "none"; // Hide the popup
  }

// //////////////////////////All prpups close and open
// Topology 01
function openAllPopupsTopology01() {
    const popups = document.querySelectorAll(".popup, .rightBottompopup, .leftTopPopup, .leftCenterpopup, .leftBottompopup");
    popups.forEach(popup => popup.style.display = "block");
  
    // Change button colors
    const openButton = document.querySelector(".open-close-btn:nth-of-type(1) .circular-btn");
    const closeButton = document.querySelector(".open-close-btn:nth-of-type(2) .circular-btn");
    openButton.classList.add("selected"); // Blue color
    closeButton.classList.remove("selected"); // Reset black color
  }
  
  function closeAllPopupsTopology01() {
    const popups = document.querySelectorAll(".popup, .rightBottompopup, .leftTopPopup, .leftCenterpopup, .leftBottompopup");
    popups.forEach(popup => popup.style.display = "none");
  
    // Change button colors
    const openButton = document.querySelector(".open-close-btn:nth-of-type(1) .circular-btn");
    const closeButton = document.querySelector(".open-close-btn:nth-of-type(2) .circular-btn");
    closeButton.classList.add("selected"); // Blue color
    openButton.classList.remove("selected"); // Reset black color
  }
// Topology 02
function openAllPopupsTopology02() {
    const popups = document.querySelectorAll(".popup, .rightBottompopup, .rightThreepopup, .rightFourpopup, .leftTopPopup, .leftCenterpopup, .leftBottompopup, .leftFinnalpopup");
    popups.forEach(popup => popup.style.display = "block");
  
    // Change button colors
    const openButton = document.querySelector(".open-close-btn:nth-of-type(1) .circular-btn");
    const closeButton = document.querySelector(".open-close-btn:nth-of-type(2) .circular-btn");
    openButton.classList.add("selected"); // Blue color
    closeButton.classList.remove("selected"); // Reset black color
  }
  
  function closeAllPopupsTopology02() {
    const popups = document.querySelectorAll(".popup, .rightBottompopup, .rightThreepopup, .rightFourpopup, .leftTopPopup, .leftCenterpopup, .leftBottompopup, .leftFinnalpopup");
    popups.forEach(popup => popup.style.display = "none");
  
    // Change button colors
    const openButton = document.querySelector(".open-close-btn:nth-of-type(1) .circular-btn");
    const closeButton = document.querySelector(".open-close-btn:nth-of-type(2) .circular-btn");
    closeButton.classList.add("selected"); // Blue color
    openButton.classList.remove("selected"); // Reset black color
  }




