// Function to handle dropdown selection change
function handleDropdownChange() { 
  const selectedValue = document.getElementById("topologyDropdown").value;
  // Hide all topology sections 
  const sections = document.querySelectorAll(".topology-row");
  sections.forEach(section => {
      section.style.display = "none";
  });
  // Show the selected section based on the dropdown value
  const selectedSection = document.getElementById(selectedValue.replace(/\s+/g, '-').toLowerCase());
  if (selectedSection) {
      selectedSection.style.display = "flex";
  }
}
// Function to generate output based on input fields
function generateOutput(event, topoNumber) {
    // Prevent form submission
    if (event) event.preventDefault();
  
    // Ensure the topology number is provided
    if (!topoNumber) {
      alert("Topology number is required.");
      return;
    }
  
    // Get the selected topology value
    const selectedTopology = document.getElementById('topologyDropdown')?.value;
  
    // Validate required fields
    if (!selectedTopology) {
      alert("Please select a topology.");
      return;
    }
  
    // Define a helper function to get values and update diagram elements
    const updateElement = (fieldId, diagramId) => {
      const fieldValue = document.getElementById(`${fieldId}${topoNumber}`)?.value;
      const diagramElement = document.getElementById(`${diagramId}-${topoNumber}`);
      if (diagramElement) {
        diagramElement.innerHTML = fieldValue || "";
      }
    };
  
    // Map field-to-diagram IDs
    const mappings = [
      { field: "vcnName", diagram: "vcn-name" },
      { field: "vcnCIDR", diagram: "vcn-no" },
      { field: "vpcName", diagram: "vpc-name" },
      { field: "vpcCIDR", diagram: "vcn-cidr" },
      { field: "publicSubnetName", diagram: "public-name" },
      { field: "publicSubnetCIDR", diagram: "public-cidr" },
      { field: "VCNSpokeA", diagram: "vcn-spoke-a" },
      { field: "VCNSpokeCIDRa", diagram: "vcn-spoke-a-no" },
      { field: "VCNSpokeB", diagram: "vcn-spoke-b" },
      { field: "VCNSpokeCIDRb", diagram: "vcn-spoke-b-no" },
      { field: "privateSubnetRange", diagram: "private-name" },
      { field: "privateSubnetCIDR", diagram: "private-cidr" },
      { field: "privateRTName", diagram: "private-rt-name" },
      { field: "publicRTName", diagram: "public-rt-name" },
      { field: "publicSLName", diagram: "public-sl-name" },
      { field: "privateSLName", diagram: "private-sl-name" },
      { field: "SLName", diagram: "sl-label" },
      { field: "SubnetName", diagram: "subnet-label" },
      { field: "SubnetRange", diagram: "subnet-no" },
      { field: "6Popup", diagram: "6popup" },
      { field: "7Popup", diagram: "7popup" },
      { field: "8Popup", diagram: "8popup" },
      // code field data tf 1
      { field: "vpcName", diagram: "code-vpc-name" },
      { field: "vpcCIDR", diagram: "code-vcn-cidr" },
      { field: "publicSubnetName", diagram: "code-public-name" },
      { field: "publicSubnetCIDR", diagram: "code-public-cidr" },
      { field: "SubnetName", diagram: "code-subnet-label" },
      { field: "SubnetRange", diagram: "code-subnet-no" },
      { field: "privateSubnetRange", diagram: "code-private-name" },
      { field: "privateSubnetCIDR", diagram: "code-private-cidr" },
    ];
  
    // Iterate through mappings to populate diagram values
    mappings.forEach(({ field, diagram }) => updateElement(field, diagram));
  
    // Show the appropriate Terraform popup
    showPopup(`generate-TF-popup-${topoNumber}`);
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
// Function to show popup
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';
        codeFieldData();
    }
}
// Function to close popups
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    }
}
 // Open all popups dynamically by class
function openAllPopups(popupClass) {
  const popups = document.querySelectorAll(popupClass);
  popups.forEach(popup => popup.style.display = "block");
}
// Close all popups dynamically by class
function closeAllPopups(popupClass) {
  const popups = document.querySelectorAll(popupClass);
  popups.forEach(popup => popup.style.display = "none");
}
// Flow lines
let lines = {}; 
const connectionMap = {
    'chk-pub-priv-db': [['top1-pub-1', 'top1-db-1'], ['top1-priv-1', 'top1-db-1'], ['top1-priv-2', 'top1-db-1']],
    'chk-pub-inet': [['top1-pub-1', 'top1-inet-1']],
    'chk-priv-inet': [['top1-priv-1', 'top1-inet-1'], ['top1-priv-2', 'top1-inet-1']],
    'chk-pub-priv-bidirectional': 
    [
        ['top1-pub-1', 'top1-priv-1', { path: 'straight', startPlug: 'arrow1', endPlug: 'arrow' }],
        ['top1-pub-1', 'top1-priv-2', { path: 'arc', startPlug: 'arrow1', endPlug: 'arrow' }]
    ]
};
const endpointIds = ['top1-pub-1', 'top1-priv-1', 'top1-priv-2', 'top1-db-1', 'top1-inet-1'];

const createLeaderLine = (start, end, options = {}) => 
    new LeaderLine(document.getElementById(start), document.getElementById(end), { 
        color: options.color || '#2474ad', size: 3, path: options.path || 'fluid',
        startPlug: options.startPlug || 'behind', endPlug: options.endPlug || 'arrow', hide: true
    }).show('draw', { duration: 800 });

const updateFlowLines = () => {
    document.querySelectorAll('.flow-checkbox').forEach(checkbox => {
        if (checkbox.checked) {
            if (!lines[checkbox.id]) lines[checkbox.id] = connectionMap[checkbox.id]?.map(([s, e, o = {}]) => createLeaderLine(s, e, o));
        } else {
            lines[checkbox.id]?.forEach(line => line.hide('fade', { duration: 500 }));
            delete lines[checkbox.id];
        }
    });
};

const handleShowEndpoints = () => {
    let show = document.getElementById('chk-show-endpoints').checked;
    endpointIds.forEach(id => document.getElementById(id).style.display = show ? 'block' : 'none');
    document.querySelectorAll('.flow-checkbox').forEach(checkbox => {
        checkbox.closest('label').style.display = show ? 'block' : 'none';
        if (!show) checkbox.checked = false;
    });
    updateFlowLines();
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('chk-show-endpoints').addEventListener('change', handleShowEndpoints);
    document.querySelectorAll('.flow-checkbox').forEach(checkbox => checkbox.addEventListener('change', updateFlowLines));
    handleShowEndpoints();
});
