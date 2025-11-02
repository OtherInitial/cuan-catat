<div>
  <canvas id="realtimeChart3"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    var ctx3 = document.getElementById('realtimeChart3').getContext('2d');
    var myChart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ampere (A)',
                data: [],
                backgroundColor: '#FB6D48',
                borderColor: '#FB6D48',
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

    var updateChart3 = function() {
    $.ajax({
      url: "{{ route('api.chart3') }}",
      type: 'GET',
      dataType: 'json',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function(data) {
        myChart3.data.labels = data.labels;
        myChart3.data.datasets[0].data = data.data;
        myChart3.update();
      },
      error: function(data){
        console.log(data);
      }
    });
  }

updateChart3();
setInterval(function() {
  updateChart3();
}, 1000);

</script>