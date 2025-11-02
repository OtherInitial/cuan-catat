<div>
  <canvas id="realtimeChart4"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    var ctx4 = document.getElementById('realtimeChart4').getContext('2d');
    var myChart4 = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ampere (A)',
                data: [],
                backgroundColor: '#2C7865',
                borderColor: '#2C7865',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var updateChart4 = function() {
    $.ajax({
      url: "{{ route('api.chart4') }}",
      type: 'GET',
      dataType: 'json',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function(data) {
        myChart4.data.labels = data.labels;
        myChart4.data.datasets[0].data = data.data;
        myChart4.update();
      },
      error: function(data){
        console.log(data);
      }
    });
  }

updateChart4();
setInterval(function() {
  updateChart4();
}, 1000);

</script>